import { ethers } from 'ethers'
import { ContractContext as I1155StoreGenericContract } from './ABIs/I1155StoreGeneric'
import I1155StoreGenericABI from "./ABIs/I1155StoreGeneric.json"
import { CorporationShopItem, Currency } from './corporations/useCorporationShop'
import { generic1155StoreAddress, USDTManagerAddress, wrappedEthAddress } from '@ix/base/composables/Contract/WalletAddresses'

export const useBuyNFTs = () => {
  const activeChain = useActiveChain()
  const buyNFTStoreAddress = generic1155StoreAddress[activeChain]
  const ixtAddress = IXTAddress[activeChain]
  const usdcAddress = USDCManagerAddress[activeChain]
  const USDTAddress = USDTManagerAddress[activeChain]
  const wethAddress = wrappedEthAddress[activeChain]
  const pixAssetAddress = assetsAddress[activeChain]

  const { refresh: refreshTokens } = useTokenData()

  const { createTransaction, ...contract } = defineMCContract<I1155StoreGenericContract>('shop-contract', {

    createContract: (provider) =>
      new ethers.Contract(buyNFTStoreAddress, I1155StoreGenericABI.abi, provider.getSigner()) as unknown as I1155StoreGenericContract,

    contractAddress: buyNFTStoreAddress,

    notifications: {
      sender: 'proxy-of-change',
      failMessage: 'Failed to buy'
    }
  })

  const buyNFT = async (shopItem: CorporationShopItem, currency: Currency) =>
    createTransaction(async (contract) => {
      const { CHAIN_NET } = useRuntimeConfig().public
      const isMainNet = CHAIN_NET == 'main'
      const { walletAdress } = useWallet()
      const { approveMoreTokens, pixTokenContract, usdcManagerContract, usdtManagerContract, wrappedEthContract, getOraclePrice, approveContract } = usePayment()
      const { assetsContract } = useStakeNFTContracts()
      const { setTransactionState } = useTransactions()

      const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
      const approveAmount = shopItem.payment.value * shopItem.price

      const getApproveContract = (() => {
        switch (currency) {
          case 'ixt':
            return pixTokenContract
          case 'usdc':
            return usdcManagerContract
          case 'usdt':
            return usdtManagerContract
          case 'weth':
            return wrappedEthContract
          case 'matic':
            return null
        }
      })()

      const choosePaymentAddress = () => {
        switch (currency) {
          case 'ixt':
            return ixtAddress
          case 'usdc':
            return usdcAddress
          case 'usdt':
            return USDTAddress
          case 'weth':
            return wethAddress
          case 'matic':
            return ZERO_ADDRESS
          default:
            return usdcAddress
        }
      }

      setTransactionState('signing')

      if (currency == 'energy') {

        await approveContract(assetsContract, buyNFTStoreAddress)

        console.log("Buying with energy", shopItem.saleId, shopItem.payment.value)
        return contract.buyTokensWithERC1155(walletAdress.value, ZERO_ADDRESS, 0, shopItem.payment.value, shopItem.saleId, pixAssetAddress, false, false, 24)

      }

      const paymentAddress = choosePaymentAddress()

      let price
      price = approveAmount

      if (paymentAddress != USDTAddress)
        price = await getOraclePrice(USDTAddress, paymentAddress, approveAmount)


      if (shopItem.price > 0 && approveContract != null)
        await approveMoreTokens(price, getApproveContract, buyNFTStoreAddress)

      console.log("BUYING", shopItem)
      if (isMainNet && approveContract != null) {
        return contract.buyTokens(walletAdress.value, ZERO_ADDRESS, 0, shopItem.payment.value, shopItem.saleId, paymentAddress, false, false)
      } else if (isMainNet) {
        return contract.buyTokens(walletAdress.value, ZERO_ADDRESS, 0, shopItem.payment.value, shopItem.saleId, paymentAddress, false, false, { value: price })
      } else {
        // This is for testnet, we need to add testnet ABI from 1155StoreGeneric mumbai address and set up contract
        // return contract.buyTokens(shopItem.saleId, shopItem.value, shopItem.tokenId, ZERO_ADDRESS, ixtAddress, false, false)
      }
    }, {
      onSuccess: async () => await refreshTokens(),
    })

  return {
    ...contract,
    buyNFT,
  }
}
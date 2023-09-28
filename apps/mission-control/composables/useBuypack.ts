import { ethers } from "ethers";
import { gravityGradeAddress, IXTAddress, USDTManagerAddress, maxCoinAddress } from "@ix/base/composables/Contract/WalletAddresses";
import { ContractContext as GravityGradeContract } from "./ABIs/GravityGrade";

import GravityGradeABI from './ABIs/GravityGrade.json'
import { NftFragment } from "#gql";

export type TokenType = 'matic' | 'ixt' | 'usdt' | 'weth'
type StarterPacks = 'gg37small' | 'gg37medium'
export const getGravityGradeSellId = (packType: StarterPacks) => {
  switch (packType) {
    case 'gg37small': return 1;
    case 'gg37medium': return 2
  }
}

export const useBuyPacks = () => {
  const selectedPack = useState<NftFragment | null>('buypack-selected', () => null)

  const activeChain = useActiveChain()
  const { setTransactionState, resetTransactionState } = useTransactions()

  const gravityGradeContract = useState<GravityGradeContract | null>('gravity-grade-contract', () => null)

  const ixtAddress = IXTAddress[activeChain]
  const ggAddress = gravityGradeAddress[activeChain]
  const maxCoinsAddress = maxCoinAddress[activeChain]
  const usdtManagerAddress = USDTManagerAddress[activeChain]

  const { oracleManagerContract, usdtManagerContract, tetherContract, pixTokenContract, maxCoinContract } = usePayment()
  const { onTransactionResolved, provider } = useWallet()
  const { user } = useUser()
  const { addNotification } = useNotifications()


  const setupGravityGradeContract = (provider: ethers.providers.Web3Provider) => {
    const ggContract = new ethers.Contract(ggAddress, GravityGradeABI.abi, provider.getSigner()) as unknown as GravityGradeContract


    gravityGradeContract.value = markRaw(ggContract)

  }


  const fetchGGSaleInfo = async (saleId: number) => {
    return await GqlGGSaleInfo({ saleId })
  }


  const buySelectedPack = (paymentMethod: TokenType) => {
    if (!selectedPack.value)
      return
    const saleId = getGravityGradeSellId(selectedPack.value.tokenInfo?.type as StarterPacks) as number

    switch (paymentMethod) {
      case 'matic':
        return payWithMatic(saleId)
      case 'usdt':
        return payWithUSDT(saleId)
      case 'ixt':
        return payWithIXT(saleId)
    }
  }

  const payWithMatic = async (saleId: number) => {

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    const saleInfo = await fetchGGSaleInfo(saleId)

    try {
      const price = await oracleManagerContract.value.callStatic.getAmountOut(
        usdtManagerAddress,
        ZERO_ADDRESS,
        saleInfo.ggSaleInfo.salePrice + '')

      if (price.toNumber() <= 0) {
        return false
      }


      const transaction = await gravityGradeContract.value.buyPacks(saleId, 1, 0, ZERO_ADDRESS, ZERO_ADDRESS, {
        value: price
      })

      onTransactionResolved(transaction.hash)
      setTransactionState('minting')
      buyPackDone()

    }
    catch (error) {
      return false
    }
  }

  const payWithUSDT = async (saleId: number) => {

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    const saleInfo = await fetchGGSaleInfo(saleId)

    try {
      const allowance = (await usdtManagerContract.value.allowance(user.value.wallet_address, ggAddress)).toNumber()

      if (allowance < 10000000) {
        const transaction = await tetherContract.value.approve(ggAddress, 10000000)
        setTransactionState('approving')

        await onTransactionResolved(transaction.hash)
      }

      const gasPrice = await provider.value.getGasPrice()

      const transaction = await gravityGradeContract.value.buyPacks(saleId, 1, 0, ZERO_ADDRESS, usdtManagerAddress, {
        gasPrice: gasPrice
      })

      setTransactionState('minting')
      onTransactionResolved(transaction.hash)
      buyPackDone()

    }
    catch (error) {
      return false
    }
  }

  const payWithIXT = async (saleId: number) => {

    const saleInfo = await fetchGGSaleInfo(saleId)

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    try {
      const allowance = (await pixTokenContract.value.allowance(user.value.wallet_address, ggAddress)).toNumber()

      if (allowance < 10000000) {
        const transaction = await pixTokenContract.value.approve(ggAddress, 10000000)
        setTransactionState('approving')
        onTransactionResolved(transaction.hash)

      }

      const gasPrice = await provider.value.getGasPrice()

      const transaction = await gravityGradeContract.value.buyPacks(saleId, 1, 0, ZERO_ADDRESS, ixtAddress, {
        gasPrice: gasPrice
      })

      setTransactionState('approving')
      onTransactionResolved(transaction.hash)
      buyPackDone()

    }
    catch (error) {
      return false
    }
  }

  const testNetPayWithMaxCoin = async (saleId: number) => {

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    try {
      const allowance = (await maxCoinContract.value.allowance(user.value.wallet_address, ggAddress)).toNumber()

      if (allowance < 10000000) {
        const transaction = await maxCoinContract.value.approve(ggAddress, 10000000)
        setTransactionState('approving')
        onTransactionResolved(transaction.hash)
      }

      const gasPrice = await provider.value.getGasPrice()

      const transaction = await gravityGradeContract.value.buyPacks(0, 1, 0, ZERO_ADDRESS, maxCoinsAddress)

      setTransactionState('minting')
      onTransactionResolved(transaction.hash)
      buyPackDone()
    }
    catch (error) {
      return false
    }
  }

  const buyPackDone = async () => {
    addNotification("Starter Pack bought!. Check your inventory!")
    resetTransactionState()
  }

  return {
    setupGravityGradeContract,
    payWithIXT,
    payWithMatic,
    payWithUSDT,
    buySelectedPack,
    selectedPack,
  }
}
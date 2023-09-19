import { AssetConverterRecipeFragment } from "#gql"
import { ethers } from 'ethers'
import { ContractContext as AssetConverterContract } from '../ABIs/AssetConverter'
import AssetConverterABI from "../ABIs/AssetConverter.json"
import { assetsConverterAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { CorporationShopItem } from "./useCorporationShop"

export const useAssetConverterRecipesData = () =>
  useAsyncDataState('asset-converter-data', async (): Promise<AssetConverterRecipeFragment[]> => {

    const recipes = await GqlAssetConverterRecipes()

    return recipes.assetConverterRecipes
  })



export const useAssetConverter = () => {
  const activeChain = useActiveChain()
  const assetConverterRecipeAddress = assetsConverterAddress[activeChain]
  const { assetsContract } = useStakeNFTContracts()

  const { approveContract } = usePayment()


  const { refresh: refreshTokens } = useTokenData()

  const { createTransaction, ...contract } = defineMCContract<AssetConverterContract>('asset-converter-contract', {

    createContract: (provider) =>
      new ethers.Contract(assetConverterRecipeAddress, AssetConverterABI.abi, provider.getSigner()) as unknown as AssetConverterContract,

    contractAddress: assetConverterRecipeAddress,

    notifications: {
      sender: 'proxy-of-change',
      failMessage: 'Failed to buy'
    }
  })

  const convertAsset = async (shopItem: CorporationShopItem) =>
    createTransaction(async (contract) => {

      return contract.convertAsset(shopItem.saleId, shopItem.payment.value)

    }, {
      approve: async () => approveContract(assetsContract, assetConverterRecipeAddress),
      onSuccess: async () => await refreshTokens(),
    })

  return {
    ...contract,
    convertAsset,
  }
}
import { BigNumber, ethers } from "ethers";
import { genericBurnGravityGradeV2Address } from "@ix/base/composables/Contract/WalletAddresses";
import { ContractContext as GenericBurnGravityGradeV2Contract } from './ABIs/GravityGradeGenericV2Burn'
import GenericBurnGravityGradeV2ABI from './ABIs/GravityGradeGenericV2Burn.json'
import { NftFragment } from "#gql";

export const useGenericBurnGravityGradeV2Contract = () => {
  const activeChain = useActiveChain()
  const ggGradeBurnV2Address = genericBurnGravityGradeV2Address[activeChain]
  const ggV2Address = gravityGradeV2WrapperAddress[activeChain]
  const voucherNFTAddress = voucherAddress[activeChain]
  const mcAssetAddress = assetsAddress[activeChain]
  const { onMintedPack } = useOpenPacks()


  const { openPack, contract, setupContract } = definePackContract<GenericBurnGravityGradeV2Contract>('generic-burn-gg-v2', {
    contractAddress: ggGradeBurnV2Address,
    listeners: {
      'PackOpened': async (_, address: string, id: BigNumber, _amount: BigNumber) => {
        const tokenId = id.toNumber()
        const amount = _amount.toNumber()
        console.log(`Opened ${amount} amounts of packs with ID: ${tokenId} from contract: ${address}`)

        const { data: token, execute: fetchPackData } = useTokenInfo(tokenId, address)
        await fetchPackData()
        onMintedPack(token.value, amount)
      }
    },

    createContract: (provider) =>
      new ethers.Contract(ggGradeBurnV2Address, GenericBurnGravityGradeV2ABI.abi, provider.getSigner()) as unknown as GenericBurnGravityGradeV2Contract
  })

  const fetchIsEligible = async (packId: number) => {
    const credentials = useGraphqlCredentials()
    return await GqlIsGGEligible({ credentials, packId })
  }

  const getPackInfo = (pack: NftFragment) => {
    const isGGPack = (pack.tokenInfo.type == 'gg-energy' || pack.tokenInfo.type == 'gg2-energy' || pack.tokenInfo.type == 'gg3-energy' || pack.tokenInfo.type == 'gg4-energy' || pack.tokenInfo.type == 'gg2')

    if (isGGPack) {
      return {
        contractAddress: ggV2Address,
        tokenId: pack.tokenId
      }
    } else if (pack.tokenInfo.type == 'voucher') {
      return {
        contractAddress: voucherNFTAddress,
        tokenId: pack.tokenId
      }
    } else if (pack.tokenInfo.type == 'rover-key') {
      return {
        contractAddress: mcAssetAddress,
        tokenId: pack.tokenId
      }
    }
  }

  const burnPackV2 = (pack: NftFragment, amount: number) =>
    openPack(async () => {

      const packInfo = getPackInfo(pack)

      const isEligible = await fetchIsEligible(Number(packInfo.tokenId))
      console.log("Burning pack:", packInfo, amount)
      return contract.value.burnPack(packInfo.contractAddress, packInfo.tokenId, amount, isEligible.isEligible)
    }, 'PackOpened')

  return {
    setupContract,
    burnPackV2
  }
}
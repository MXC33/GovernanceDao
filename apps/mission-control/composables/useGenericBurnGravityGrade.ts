import { ethers } from "ethers";
import { genericBurnGravityGradeAddress } from "./NFTs/walletAddresses";
import { ContractContext as GenericBurnGravityGradeContract } from './ABIs/GravityGradeGenericBurn'
import GenericBurnGravityGradeABI from './ABIs/GravityGradeGenericBurn.json'
import { NftFragment } from "#gql";
import BigNumber from "bignumber.js";

export const useGenericBurnGravityGradeContracts = () => {
  const activeChain = useActiveChain()
  const genericBurnGGAddress = genericBurnGravityGradeAddress[activeChain]
  const { onMintedPack } = useOpenPacks()

  const { openPack, contract, setupContract } = definePackContract<GenericBurnGravityGradeContract>('generic-burn-gg', {
    contractAddress: genericBurnGGAddress,
    listeners: {
      'PackOpened': async (_, id: BigNumber, _amount: BigNumber) => {
        const tokenId = id.toNumber()
        const amount = _amount.toNumber()
        console.log("Pack opened", tokenId)
        const { data: token, execute: fetchPackData } = useTokenInfo(tokenId, gravityGradeAddress.polygon)

        await fetchPackData()
        onMintedPack(token.value, amount)
      }
    },

    createContract: (provider) =>
      new ethers.Contract(genericBurnGGAddress, GenericBurnGravityGradeABI.abi, provider.getSigner()) as unknown as GenericBurnGravityGradeContract
  })

  const fetchIsEligible = async (packId: number) => {
    const credentials = useGraphqlCredentials()
    return await GqlIsGGEligible({ credentials, packId })
  }

  const burnGenericGGpack = (pack: NftFragment, amount: number) =>
    openPack(async () => {
      const tokenId = pack.tokenId
      const isEligible = await fetchIsEligible(Number(tokenId))
      return contract.value.burnPack(tokenId, amount, isEligible.isEligible)
    }, 'PackOpened')

  return {
    setupContract,
    burnGenericGGpack
  }
}
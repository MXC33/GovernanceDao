import { ethers } from "ethers";
import { burnGravityGradeAdress } from "./NFTs/walletAddresses";
import { ContractContext as GravityGradeBurnContract } from './ABIs/GravityGradeBurn'
import GravityGradeBurnABI from './ABIs/GravityGradeBurn.json'
import { NftFragment } from "#gql";
import BigNumber from "bignumber.js";

export const useBurnGravityGradeContract = () => {
  const activeChain = useActiveChain()
  const burnGGAddress = burnGravityGradeAdress[activeChain]
  const { onMintedPack, onMintedAnniversaryPack } = useOpenPacks()

  const { openPack, contract, setupContract } = definePackContract<GravityGradeBurnContract>('gravity-grade-burn', {
    contractAddress: burnGGAddress,
    listeners: {
      'GG_Drop3_PackBurned': async (_, id: BigNumber, _amount: BigNumber) => {

        const tokenId = id.toNumber()
        const amount = _amount.toNumber()
        if (tokenId == 2)
          return
        console.log("Pack opened", tokenId)
        const { data: token, execute: fetchPackData } = useTokenInfo(tokenId, gravityGradeAddress.polygon)

        await fetchPackData()
        onMintedPack(token.value, amount)
      },
      'GG_Drop3_MysteryBox': async (_, id: BigNumber[], _amount: BigNumber[]) => {
        const tokenIds = id.map(item => item.toNumber())
        const amounts = _amount.map(item => item.toNumber())
        console.log("MYstery Box opened", tokenIds, amounts)

        const index = amounts.findIndex(item => item > 0)
        const amount = amounts.at(index)
        const tokenIdOfReceivedItem = tokenIds.at(index)

        const { data: token, execute: fetchPackData } = useTokenInfo(tokenIdOfReceivedItem, gravityGradeAddress.polygon)

        await fetchPackData()
        onMintedAnniversaryPack(token.value, amount)
      },
    },

    createContract: (provider) =>
      new ethers.Contract(burnGGAddress, GravityGradeBurnABI.abi, provider.getSigner()) as unknown as GravityGradeBurnContract
  })


  const burnGGPack = (pack: NftFragment, amount: number) =>
    openPack(async () => {
      const tokenId = pack.tokenId
      return contract.value.burnPack(tokenId, amount)
    }, ['GG_Drop3_PackBurned', 'GG_Drop3_MysteryBox'])

  return {
    setupContract,
    burnGGPack
  }
}
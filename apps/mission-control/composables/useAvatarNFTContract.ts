import { ethers } from 'ethers'
import { ContractContext as AvatarNFTContract } from './ABIs/AvatarNFT'
import AvatarNFTABI from "./ABIs/AvatarNFT.json"
import { Corporation } from './corporations/useCorporations'


export const useAvatarBurnedData = (corporation: string) =>
  useAsyncDataState(`avatar-burned-${corporation}`, async () => {
    const credentials = useGraphqlCredentials()
    const data = await GqlBurnedAvatar({ credentials, corporation })
    return data.burnedAvatars
  })

export const useAvatarNFTContract = () => {
  const activeChain = useActiveChain()
  const avatarAddress = avatarNFTAddress[activeChain]
  const { refresh: refreshAvatar } = useAvatarNFTData()
  const { getSender } = useSender()
  const { createTransaction, ...contractSpec } = defineMCContract<AvatarNFTContract>('avatar-nft-contract', {
    contractAddress: avatarAddress,
    notifications: {
      sender: 'proxy-of-change',
      failMessage: 'Malfunction when burning!'
    },
    createContract: (provider) =>
      new ethers.Contract(avatarAddress, AvatarNFTABI.abi, provider.getSigner()) as unknown as AvatarNFTContract
  })


  const burnAvatar = (tokenId: number, corporation: Corporation) =>
    createTransaction(async (contract) => {
      return await contract.avatarBurn(tokenId, 1)
    }, {
      onSuccess: async () => await Promise.all([refreshAvatar()]),
      sender: getSender(corporation)
    })



  return {
    burnAvatar,
    ...contractSpec,
  }
}
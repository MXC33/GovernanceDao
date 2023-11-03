import { BigNumber, ethers } from 'ethers'
import GenericBurnPixAssetsABI from "./ABIs/PixAssetsGenericBurn.json"
import { ContractContext as GenericBurnPixAssetsContract } from './ABIs/PixAssetsGenericBurn'
import { genericBurnPixAssetsAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { NftFragment } from '#gql'
import { ContractInterface, CreateContractOptions } from '@ix/base/composables/Utils/defineContract'

export const useCanClaimAvatarData = () => useAsyncDataState('can-claim-avatar', async () => {
  const { canClaimAvatar } = useGenericBurnPixAssetsContract()
  const canClaim = await canClaimAvatar()
  return canClaim
})


export const definePackContract = <T extends ContractInterface<T>>(key: string, options: CreateContractOptions<T>) => {
  const { refreshPacks, refreshUserInventory } = useUserData()
  const definedContract = defineMCContract(key, {
    notifications: {
      sender: 'proxy-of-change',
      failMessage: 'Error opening pack.'
    },
    ...options
  })

  const openPack = (fn: (contract: T) => Promise<ethers.ContractTransaction>, openEvent?: string | string[]) =>
    definedContract.createTransaction(fn, {
      successOnEventKey: openEvent,
      onTxApproved: () => refreshPacks(),
      onSuccess: () => refreshUserInventory(),
      onSuccessAfterMs: 3000
    })

  return {
    ...definedContract,
    openPack
  }
}


export const useGenericBurnPixAssetsContract = () => {
  const activeChain = useActiveChain()
  const genericBurnAddress = genericBurnPixAssetsAddress[activeChain]
  const { onAvatarClaim } = useOpenPacks()

  const { refreshUserInventory } = useUserData()
  const { onTransactionResolved, walletAdress } = useWallet()
  const { setTransactionState } = useTransactions()
  const { refresh: refreshCanClaim } = useCanClaimAvatarData()
  const { openPack, withContract, createTransaction, contract, ...contractSpec } = definePackContract<GenericBurnPixAssetsContract>('generic-burn-pix-asset-contract', {
    contractAddress: genericBurnAddress,
    listeners: {
      'AvatarClaimed': async (address: string, pack: string, id: BigNumber, _amount: BigNumber) => {
        const tokenId = id.toNumber()
        const amount = _amount.toNumber()
        const avatarNFT: NftFragment = { tokenInfo: { type: 'avatar' }, tokenId: tokenId }
        await onAvatarClaim(avatarNFT, amount)
      }
    },


    createContract: (provider) =>
      new ethers.Contract(genericBurnAddress, GenericBurnPixAssetsABI.abi, provider.getSigner()) as unknown as GenericBurnPixAssetsContract
  })

  const burnAvatarCardPack = (tokenId: number, amount: number) =>
    openPack(async (contract) => {
      const canClaim = await canClaimAvatar()
      if (canClaim) {
        setTransactionState('unclaimed-avatar')
        console.log("Has avatar to claim you can opening.")
        return await contract.claimAvatar()
      }

      const transaction = await contract.burnPack(tokenId, amount, false)
      await onTransactionResolved(transaction.hash)
      setTransactionState("second-transaction")
      await new Promise(resolve => setTimeout(resolve, 45000));
      return await contract.claimAvatar()
    }, 'AvatarClaimed')

  const burnAOCBadgePack = (tokenId: number, amount: number) =>
    openPack(async (contract) => {

      return await contract.burnPack(tokenId, amount, false)

    })

  const canClaimAvatar = async () => {
    const canClaim = await withContract((contract) =>
      contract.getAvatarClaimStatus(walletAdress.value)
    )

    return (canClaim.gt(0))
  }

  const claimAvatarPack = () =>
    createTransaction(() => contract.value.claimAvatar(), {
      onSuccessAfterMs: 3000,
      onSuccess: () => Promise.all([refreshCanClaim(), refreshUserInventory()]),
      successOnEventKey: 'AvatarClaimed'
    })

  return {
    canClaimAvatar,
    claimAvatarPack,
    burnAvatarCardPack,
    burnAOCBadgePack,
    ...contractSpec,
  }
}
import { BigNumber, ethers } from "ethers";
import { lootChestAdress } from "./NFTs/walletAddresses";
import { ContractContext as LootChestContractNew } from './ABIs/LootCrate'
import LootChestABINew from './ABIs/LootCrate.json'

import { ContractContext as LootChestContract } from './ABIs/LootChestOpener'
import LootChestABI from './ABIs/LootChestOpener.json'

type LootChestContractUnion = LootChestContractNew | LootChestContract


export const useLootChestContract = () => {
  const activeChain = useActiveChain()
  const contractAdress = lootChestAdress[activeChain]
  const ABI = activeChain == 'polygon' ?
    LootChestABI.abi :
    LootChestABINew.abi

  const { onMintedPack } = useOpenPacks()
  const { openPack, ...contractSpec } = definePackContract<LootChestContractUnion>('loot-chest-contract', {
    contractAddress: contractAdress,
    listeners: {
      'ChestOpened': async (_, tokenIds: BigNumber[], balances: BigNumber[]) => {
        const tokenIdsToNumber = tokenIds.map(tokenId => tokenId.toNumber())
        const { data, execute: fetchTokens } = useTokensInfo(tokenIdsToNumber)
        await fetchTokens()
        const tokens = data.value
        const tokensWithBalance = tokens.map((token, index) => {
          return {
            ...token,
            balance: balances[index].toNumber()
          }
        })

        onMintedPack({ tokenInfo: { type: 'loot-crate' } }, 1, tokensWithBalance)
      }
    },

    createContract: (provider) =>
      new ethers.Contract(contractAdress, ABI, provider.getSigner()) as unknown as LootChestContractUnion
  })

  const openLootCrate = (amount: number) =>
    openPack((contract) => contract.openChests(amount), 'ChestOpened')

  return {
    openLootCrate,
    ...contractSpec,
  }
}



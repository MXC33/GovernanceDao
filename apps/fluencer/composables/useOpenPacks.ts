import { BigNumber, ethers } from "ethers";
import { genericBurnGravityGradeV2Address } from "@ix/base/composables/Contract/WalletAddresses";
import { ContractContext as GenericBurnGravityGradeV2Contract } from './ABIs/GravityGradeGenericV2Burn'
import GenericBurnGravityGradeV2ABI from './ABIs/GravityGradeGenericV2Burn.json'
import { NftFragment } from "#gql";
import { ContractInterface } from "@ix/base/composables/Utils/defineContract";

export const usePackContent = () => useState<NftFragment[]>('opened-pack-content', () => [])

export const useOpenPacks = <T extends ContractInterface<T> & GenericBurnGravityGradeV2Contract>() => {
  const activeChain = useActiveChain()
  const ggGradeBurnV2Address = genericBurnGravityGradeV2Address[activeChain]
  const voucherNFTAddress = voucherAddress[activeChain]

  const contractAddress = ggGradeBurnV2Address as string
  const { refresh: refreshTokens } = useVoucherData()
  const { refresh: refreshIXT } = useCurrencyData()
  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('voucher-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    listeners: {
      'PackOpened': async (_, address: string, id: BigNumber, _amount: BigNumber) => {
        const tokenId = id.toNumber()
        const amount = _amount.toNumber()
        console.log(`Opened ${amount} amounts of packs with ID: ${tokenId} from contract: ${address}`)
      }
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, GenericBurnGravityGradeV2ABI.abi, provider.getSigner()) as unknown as T
    }
  })

  const openPack = (pack: NftFragment) =>
    createTransaction((contract) => {
      if (!pack.tokenId || !voucherNFTAddress)
        return undefined

      // @ts-ignore
      return contract.burnPack(voucherNFTAddress, pack.tokenId, 1, false)
    }, {
      onSuccess: async () => await Promise.all([refreshTokens(), refreshIXT()])
    })

  return {
    openPack,
  }
}
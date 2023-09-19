import { ethers } from "ethers";
import { merkleMinterAddress, pixAdress, pixStakableAdress, assetStakableAdress } from "@ix/base/composables/Contract/WalletAddresses";
import { ContractContext as PixMerkleMinterContract } from './ABIs/PIXMerkleMinter'

import type { MintByProofRequest } from './ABIs/PIXMerkleMinter'
import { ContractContext as IERC721Contract } from './ABIs/IERC721'

import PixMerkleMinterABI from './ABIs/PIXMerkleMinter.json'
import { NftFragment } from "#gql";


export const useMerkleMintContract = () => {
  const activeChain = useActiveChain()
  const { showLogin, onTransactionResolved, walletAdress } = useWallet()
  const { fetchMerkleData } = useMcIXAPI()
  const { stakeFailed } = useStakeNFTContracts()

  const merkleMintContract = useState<PixMerkleMinterContract | null>('merkle-mint-contract', () => null)

  const pixContract = useState<IERC721Contract | null>('pix-contract', () => null)

  const pixMinterAddress = merkleMinterAddress[activeChain]
  const pixStakeAddress = pixStakableAdress[activeChain]
  const assetStakeAddress = assetStakableAdress[activeChain]
  const pixAddress = pixAdress[activeChain]

  const setupMerkleMintContract = (provider: ethers.providers.Web3Provider) => {
    const merklePixMintContract = new ethers.Contract(pixMinterAddress, PixMerkleMinterABI.abi, provider.getSigner()) as unknown as PixMerkleMinterContract

    merkleMintContract.value = markRaw(merklePixMintContract)
  }

  const mintPix = async (pix: NftFragment) => {

    console.log("Staked Title", pix.tokenInfo.title)
    console.log("Staked TokenID", pix.tokenId)
    console.log("Staked Minted", pix.tokenInfo.minted)

    if (pix.tokenId != null) {
      console.log("Pix already minted")
      return true
    }


    const merkle = await fetchMerkleData(pix)
    console.log("MERKLE", merkle)
    const { infos, merkleProofs, merkleRoots } = merkle.data

    if (infos.length == 0)
      return stakeFailed("Your pix are too fresh. They can't be used to stake yet.", true)

    const infoMap: MintByProofRequest = {
      pixId: infos[0][0],
      category: infos[0][1],
      size: infos[0][2]
    }

    await showLogin()

    try {

      const transaction = await merkleMintContract.value.mintByProof(walletAdress.value, infoMap, merkleRoots[0], merkleProofs[0])

      await onTransactionResolved(transaction.hash)
      console.log("Minted!")


    } catch (error) {
      stakeFailed(error.message)
    }
  }



  return {
    setupMerkleMintContract,
    mintPix,
  }
}
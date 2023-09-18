import { BigNumber, BigNumberish, ContractTransaction, ethers } from "ethers";
import { tetherAddress, gravityGradeAddress, oracleManagerAddress, IXTAddress, USDTManagerAddress, maxCoinAddress, wrappedEthAddress } from "./NFTs/walletAddresses";
import { ContractContext as TetherContract } from './ABIs/tether'
import { ContractContext as OracleContract } from "./ABIs/OracleManager";
import { ContractContext as GravityGradeContract } from "./ABIs/GravityGrade";
import { ContractContext as PixTokenContract } from "./ABIs/PIXT"
import { ContractContext as MaxCoinContract } from "./ABIs/MaxCoin";
import { ContractContext as USDTManagerContract } from "./ABIs/tether";
import { ContractContext as USDCManagerContract } from "./ABIs/usdcContract"
import { ContractContext as WrappedEthContract } from "./ABIs/WrappedEth";



import TetherABI from './ABIs/tether.json'
import OracleManagerABI from './ABIs/OracleManager.json'
import GravityGradeABI from './ABIs/GravityGrade.json'
import PixTokenABI from './ABIs/PIXT.json'
import MaxCoinABI from './ABIs/MaxCoin.json'
import USDCABI from './ABIs/usdcContract.json'
import WrappedEthABI from './ABIs/WrappedEth.json'
import { Ref } from "vue";
import { MaybeRef, get } from "@vueuse/core";


interface PaymentContract {
  allowance(
    owner: string,
    spender: string,
    overrides?: any
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: any
  ): Promise<ContractTransaction>;
}

interface ApproveContract {

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: any
  ): Promise<boolean>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: any
  ): Promise<ContractTransaction>;
}


export const usePayment = () => {

  const activeChain = useActiveChain()

  const tetherContract = useState<TetherContract | null>('tether-contract', () => null)
  const usdtManagerContract = useState<USDTManagerContract | null>('usdt-manager-contract', () => null)
  const usdcManagerContract = useState<USDCManagerContract | null>('usdc-manager-contract', () => null)
  const oracleManagerContract = useState<OracleContract | null>('oracle-contract', () => null)
  const gravityGradeContract = useState<GravityGradeContract | null>('gravity-grade-contract', () => null)
  const pixTokenContract = useState<PixTokenContract | null>('pix-token-contract', () => null)
  const maxCoinContract = useState<MaxCoinContract | null>('max-coin-contract', () => null)
  const wrappedEthContract = useState<WrappedEthContract | null>('wrapped-eth-contract', () => null)





  const ixtAddress = IXTAddress[activeChain]
  const ggAddress = gravityGradeAddress[activeChain]
  const oracleAddress = oracleManagerAddress[activeChain]
  const tetherUSDTAddress = tetherAddress[activeChain]
  const usdcAddress = USDCManagerAddress[activeChain]
  const maxCoinsAddress = maxCoinAddress[activeChain]
  const usdtManagerAddress = USDTManagerAddress[activeChain]
  const wethAddress = wrappedEthAddress[activeChain]


  const setupTetherContract = (provider: ethers.providers.Web3Provider) => {
    const USDTContract = new ethers.Contract(tetherUSDTAddress, TetherABI.abi, provider.getSigner()) as unknown as TetherContract

    tetherContract.value = markRaw(USDTContract)

  }

  const setupUSDTManagerContract = (provider: ethers.providers.Web3Provider) => {
    const USDTManagerContract = new ethers.Contract(usdtManagerAddress, TetherABI.abi, provider.getSigner()) as unknown as USDTManagerContract

    usdtManagerContract.value = markRaw(USDTManagerContract)

  }

  const setupUSDCManagerContract = (provider: ethers.providers.Web3Provider) => {
    const USDCManagerContract = new ethers.Contract(usdcAddress, USDCABI.abi, provider.getSigner()) as unknown as USDCManagerContract

    usdcManagerContract.value = markRaw(USDCManagerContract)

  }

  const setupOracleManagerContract = (provider: ethers.providers.Web3Provider) => {
    const oracleContract = new ethers.Contract(oracleAddress, OracleManagerABI.abi, provider.getSigner()) as unknown as OracleContract


    oracleManagerContract.value = markRaw(oracleContract)

  }

  const setupGravityGradeContract = (provider: ethers.providers.Web3Provider) => {
    const ggContract = new ethers.Contract(ggAddress, GravityGradeABI.abi, provider.getSigner()) as unknown as GravityGradeContract


    gravityGradeContract.value = markRaw(ggContract)

  }


  const setupPixTokenContract = (provider: ethers.providers.Web3Provider) => {
    const pixTContract = new ethers.Contract(ixtAddress, PixTokenABI.abi, provider.getSigner()) as unknown as PixTokenContract


    pixTokenContract.value = markRaw(pixTContract)

  }

  const setupMaxCoinContract = (provider: ethers.providers.Web3Provider) => {
    const maxCContract = new ethers.Contract(maxCoinsAddress, MaxCoinABI.abi, provider.getSigner()) as unknown as MaxCoinContract


    maxCoinContract.value = markRaw(maxCContract)
  }

  const setupWrappedEthContract = (provider: ethers.providers.Web3Provider) => {
    const wethContract = new ethers.Contract(wethAddress, WrappedEthABI.abi, provider.getSigner()) as unknown as WrappedEthContract


    wrappedEthContract.value = markRaw(wethContract)
  }



  const getWei = (amount: number) =>
    ethers.utils.parseUnits(amount + '', 'ether')


  const getOraclePrice = async (originalCurrency: string, toCurrency: string, amount: number) => {
    const sixDecimalsAmount = amount * 1000000
    const price = await oracleManagerContract.value.getAmountOutView(originalCurrency, toCurrency, sixDecimalsAmount)
    return price
  }

  const approveMoreTokens = async (amount: number | BigNumber, fromContractInput: MaybeRef<PaymentContract>, toAddress: string) => {
    const { setTransactionState } = useTransactions()
    const { onTransactionResolved, walletAdress } = useWallet()
    const fromContract = get(fromContractInput)

    if (fromContract == null)
      return true

    let weiAmount: number | BigNumber = amount
    if (typeof amount == "number")
      weiAmount = getWei(amount)

    const allowance = await fromContract.allowance(walletAdress.value, toAddress)

    if (allowance.gt(weiAmount))
      return true
    setTransactionState('approving')

    const transaction = await fromContract.approve(toAddress, weiAmount)
    return onTransactionResolved(transaction.hash)
  }


  const approveContract = async (fromContractInput: MaybeRef<ApproveContract>, toAddress: string) => {
    const { setTransactionState } = useTransactions()
    const { onTransactionResolved, walletAdress } = useWallet()
    const fromContract = get(fromContractInput)

    const isApproved = await fromContract?.isApprovedForAll(walletAdress.value, toAddress)

    if (isApproved)
      return false

    setTransactionState('approving')
    const transaction = await fromContract?.setApprovalForAll(toAddress, true)
    return onTransactionResolved(transaction.hash)

  }
  return {
    setupTetherContract,
    setupOracleManagerContract,
    setupGravityGradeContract,
    setupPixTokenContract,
    setupMaxCoinContract,
    setupUSDTManagerContract,
    setupUSDCManagerContract,
    setupWrappedEthContract,
    tetherContract,
    usdtManagerContract,
    oracleManagerContract,
    gravityGradeContract,
    pixTokenContract,
    maxCoinContract,
    usdcManagerContract,
    wrappedEthContract,
    approveMoreTokens,
    getWei,
    approveContract,
    getOraclePrice
  }
}
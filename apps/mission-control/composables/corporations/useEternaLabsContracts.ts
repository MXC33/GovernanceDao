import { BigNumber, ethers, utils } from "ethers";
import { eternaLabsAddress } from "@ix/base/composables/Contract/WalletAddresses";
import { ContractContext as EternaLabsContract } from '../ABIs/Prospecting'
import IProspectorABI from '../ABIs/Prospecting.json'

export const useEternalabData = () =>
  useAsyncDataState('eternalab-info', async () => {
    const credentials = useGraphqlCredentials()

    if (!credentials)
      return null

    const orderInfo = GqlEternaLabsOrderInfo({ credentials })
    const orderCosts = GqlEternaLabsOrderCosts()
    const [{ eternalLabsOrderInfo }, { eternalLabsOrderCosts }] = await Promise.all([orderInfo, orderCosts])

    return { orders: eternalLabsOrderInfo, orderData: eternalLabsOrderCosts }
  })

export const useEternalabCraft = () => {
  const { data } = useEternalabData()
  const { elCapacity: capacity } = useBaseLevelCapacityData()


  return defineOrderData(capacity, data, {
    useCapacityAsMax: true,
    getOrderMax(capacity, item) {
      const activeOrders = data.value.orders
      return capacity - activeOrders.length * item.multiplier
    },
    getOutputs: () => ({
      calculation: 'linear',
      weights: getWeights(data)
    })
  })
}

export const useEternaLabsContracts = () => {
  // const { execute: fetchGasPrice, data: gasPrice } = useAsyncGasPrice()

  const activeChain = useActiveChain()
  const { activeRecipe } = useCorporationOrders()
  const { onClaimedOrder } = useCorporationNotifications()
  const contractAddress = eternaLabsAddress[activeChain]

  // const getGasOptions = async () => {
  //   await fetchGasPrice()
  //   const uppedGasPrice = gasPrice.value.gasPriceWei.mul(2)
  //   console.log("Gas Price", uppedGasPrice.toString())
  //   return { gasPrice: uppedGasPrice }
  // }

  return defineOrderContract<EternaLabsContract>({ type: 'eternalab', task: 'craft' }, {
    contractAddress,

    claimSuccessEvent: 'RandomBiomodMinted',

    createContract: (provider) =>
      new ethers.Contract(contractAddress, IProspectorABI.abi, provider.getSigner()) as unknown as EternaLabsContract,

    listeners: {
      'RandomBiomodMinted': (_, tokenId: BigNumber) => {
        const tokenIdNumber = tokenId.toNumber()
        const moddedTokenId = tokenIdNumber == 0 ? 99 : tokenIdNumber
        console.log("CLAIMED", tokenIdNumber, "Transformed to", moddedTokenId)
        onClaimedOrder({ type: 'eternalab', task: 'craft' }, moddedTokenId)
      }
    },

    notifications: {
      sender: 'eve-pryde',
    },

    speedup: {
      ixt: (contract, { numberOfSpeedups, orderId }) =>
        contract.IXTSpeedUpOrder(numberOfSpeedups, orderId),

      astro: (contract, { numberOfSpeedups, orderId }) =>
        contract.speedUpOrder(numberOfSpeedups, orderId),
      ixtAll: (contract, { numberOfSpeedups }) =>
        contract.speedupAllIXT(numberOfSpeedups),

      astroAll: (contract, { numberOfSpeedups }) =>
        contract.speedupAllAC(numberOfSpeedups),
    },

    place: async (contract) => {
      const token = activeRecipe.value.filter(item => item.token.tokenInfo?.tier == null)[0]

      const numberOfOrders = token.value / (token.multiplier ?? 1)

      // const options = await getGasOptions()
      return contract.placeProspectingOrders(numberOfOrders)
    },

    claim: async (contract, orderId) => {
      console.log("contract", contract, "orderId", orderId)
      return contract.claimOrder(orderId)
    },
    claimAll: (contract) => {
      return contract.claimBatchOrder()
    }
  })
}
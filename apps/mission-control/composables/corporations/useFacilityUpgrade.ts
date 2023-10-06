import { BigNumber, ethers } from "ethers"
import { ContractContext as FacilityUpgradeContract } from '../ABIs/FacilityUpgrade'
import FacilityUpgradeABI from '../ABIs/FacilityUpgrade.json'
import { facilityUpgradeAdress } from "@ix/base/composables/Contract/WalletAddresses"
import { OrderData } from "./order/useCorporationOrders"
import { NftFragment } from "#gql"
import { CorporationAdjustableToken } from "./useCorporations"


export const useFacilityCooldownTimeleftData = () =>
  useAsyncDataState('facility-cooldown-data', async (): Promise<number> => {
    const credentials = useGraphqlCredentials()

    const facility = await GqlFacilityUpgradeCooldown({ credentials })

    return facility.cooldownFacilityUpgrade
  })

export const useFacilityUpgradeData = () =>
  useAsyncDataState('facility-upgrade-data', async (): Promise<OrderData> => {
    const credentials = useGraphqlCredentials()

    const [{ facilityUpgradeOrderInfo }, { facilityUpgradeOrderCosts }] = await Promise.all([GqlFacilityUpgradeOrderInfo({ credentials }), GqlFacilityUpgradeOrderCosts()])

    return { orderData: facilityUpgradeOrderCosts, orders: facilityUpgradeOrderInfo }
  })



export const useFacilityUpgrade = () => {
  const { data } = useFacilityUpgradeData()
  const { nlCapacity: capacity } = useBaseLevelCapacityData()
  const selectedUpgrade = useState<CorporationAdjustableToken>('corporation-upgrade-selected-item', () => null)


  const selectUpgradeFacility = (token: NftFragment) =>
    selectedUpgrade.value = addAdjustableToToken(token)

  const defaultOutcomeToken = useState<NftFragment>('facility-upgrade-default-outcome-token', () => null)
  const possibleOutcomeToken = useState<NftFragment>('facility-upgrade-possible-outcome-token', () => null)

  const setOutcomeTokens = (defaultToken: NftFragment, possibleToken: NftFragment) => {
    defaultOutcomeToken.value = defaultToken
    possibleOutcomeToken.value = possibleToken
  }


  const orderData = defineOrderData(capacity, data, {
    listItemDetailType: 'levelOutput',
    getOrderMax(capacity, item) {
      return item.min + item.max
    },
    getOutputs: () => ({
      calculation: 'newlandsExponential',
      defaultOutcome: defaultOutcomeToken.value,
      possibleOutcome: possibleOutcomeToken.value,
    })
  })

  return {
    selectUpgradeFacility,
    setOutcomeTokens,
    selectedUpgrade,
    orderData,
  }
}

export const useFacilityUpgradeContracts = () => {
  const activeChain = useActiveChain()
  const contractAddress = facilityUpgradeAdress[activeChain]
  const { activeRecipe } = useCorporationOrders()
  const { selectedUpgrade } = useFacilityUpgrade()
  const { approveMoreTokens, pixTokenContract } = usePayment()
  const { refresh: updateCooldownTime } = useFacilityCooldownTimeleftData()

  const { failMessage, successMessage, onClaimedOrder } = useCorporationNotifications()
  const { addNotification } = useNotifications()

  const facilityContract = defineOrderContract<FacilityUpgradeContract>({ type: 'new-lands', task: 'upgrade' }, {
    contractAddress,

    notifications: {
      sender: 'jeremiah',
    },

    claimSuccessEvent: 'FacilityUpgradeFinished',

    speedup: {
      ixt: (contract, { numberOfSpeedups, orderId }) =>
        contract.IXTSpeedUpOrder(numberOfSpeedups, orderId),

      astro: (contract, { numberOfSpeedups, orderId }) =>
        contract.speedUpOrder(numberOfSpeedups, orderId)
    },

    createContract: (provider: ethers.providers.Web3Provider) => {
      return new ethers.Contract(contractAddress, FacilityUpgradeABI.abi, provider.getSigner()) as unknown as FacilityUpgradeContract
    },

    listeners: {
      "FacilityUpgradeFinished": (_, __, upgradedFacilityTokenId: BigNumber) =>
        onClaimedOrder({ type: 'new-lands', task: 'upgrade' }, upgradedFacilityTokenId.toNumber(), 1)
    },

    place: (contract) => {
      const facilityToken = selectedUpgrade.value.token.tokenId
      const totalEnergy = activeRecipe.value.find(item => item.token.tokenInfo.type == 'energy').value
      const minimumEnergy = activeRecipe.value.find(item => item.token.tokenInfo.type == 'energy').min
      const additionalEnergy = totalEnergy - minimumEnergy

      return contract.placeFacilityUpgradeOrder(facilityToken, additionalEnergy)
    },

    claim: (contract, orderId: number) => {
      return contract.claimOrder(orderId)
    },
    claimAll: (contract) => {
      return contract.claimBatchOrder()
    }
  })

  const speedupCooldown = (numberOfSpeedups: number, price: number) =>
    //@ts-ignore
    facilityContract.createTransaction((contract) => contract.speedUpCooldown(numberOfSpeedups), {
      approve: () => approveMoreTokens(Math.ceil(numberOfSpeedups * price), pixTokenContract, facilityContract.contractAddress),
      onSuccess: () => updateCooldownTime()
    })

  return {
    ...facilityContract,
    speedupCooldown
  }
}
import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";

export const useManageTickets = () => {
  const { userFlowActive: userFlowActiveContract } = useLuckyCatGeoLotteryContract()

  const switchModel = ref<boolean>(false)
  const userFlowActive = ref<boolean>(false)
  const setupSwitchModal = async () => {
    try {
      switchModel.value = await userFlowActiveContract()
      userFlowActive.value = await userFlowActiveContract()
    } catch (e) {}
  }
  const showContinueButton = computed(() => {
    return (switchModel.value && !userFlowActive.value) || (!switchModel.value && userFlowActive.value)
  })

  return {
    switchModel,
    setupSwitchModal,
    userFlowActive,
    showContinueButton
  }
};




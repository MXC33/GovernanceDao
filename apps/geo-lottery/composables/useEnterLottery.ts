import {useIXTContract} from "@ix/base/composables/Contract/useIXTContract";
import {AdjustableNumber} from "@ix/base/composables/Utils/useAdjustableNumber";

export const IXT_PER_ENTRY = 5

export const useEnterLottery = () => {
  const lotteryEntries = useState<AdjustableNumber>('lottery-entries', () => ({
    value: 1,
    min: 1,
    max: 10
  }))

  return {
    lotteryEntries,
    IXT_PER_ENTRY
  }
}

export const useEnterLotteryContract = () => {

  const enterLottery = async (entries: number) => {
    const { allowanceCheck } = useIXTContract()

    if (!await allowanceCheck(IXT_PER_ENTRY * entries, luckyCatGeoLotteryAdress.polygon))
      throw new Error(CustomErrors.allowanceError)

    const { enterLottery } = useLuckyCatGeoLotteryContract()

    return await enterLottery(entries)
  }

  return {
    enterLottery
  }
}

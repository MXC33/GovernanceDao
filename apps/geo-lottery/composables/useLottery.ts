import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";

export const useLottery = () => {
  const {
    lotteryID,
    lotteryStartedAt: lotteryStartedAtContract
  } = useLuckyCatGeoLotteryContract()

  const lotteryStartedAtDate = async () => {
    const startedAt = Number(await lotteryStartedAtContract(await lotteryID()))
    return new Date(startedAt * 1000)
  }

  return {
    lotteryStartedAtDate
  };
};




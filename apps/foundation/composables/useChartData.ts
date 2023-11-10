import { PolygonScanTransactionsFragment } from '#gql';
import { endOfDay, subDays, getUnixTime } from 'date-fns';
import {
  ethers,
  BigNumber,
} from 'ethers';

export const useChartData = () => {

  const createChartData = (transactions: PolygonScanTransactionsFragment[], initialBalance: number, address: string) => {
    if (!transactions || !initialBalance || !address)
      return []

    // Set the starting point for the timestamps, which is the end of the current day.
    const endOfDayTimestamp = getUnixTime(endOfDay(subDays(new Date(), 1)));

    // Create an array of timestamps for the last 7 days (including today).
    const timestamps = [initialBalance];
    for (let i = 0; i < 6; i++) {
      timestamps.push(endOfDayTimestamp - 86400 * i);
    }

    // Calculate the balance for each timestamp.
    for (let i = 1; i < timestamps.length; i++) {
      const startOfPeriod = timestamps[i];
      const endOfPeriod = startOfPeriod + 86400;
      const filteredTransactions = transactions.filter(transaction => {

        const filter = Number(transaction.timeStamp) && Number(transaction.timeStamp) > startOfPeriod && Number(transaction.timeStamp) <= endOfPeriod
        return filter
      })

      const balanceChange = filteredTransactions.reduce((total, transaction) => {
        const value = transaction.value ? Number(ethers.utils.formatEther(transaction.value)) : 0;
        if (address && transaction.to && transaction.to.toLowerCase() === address.toLowerCase()) {
          return total - value;
        } else {
          return total + value;
        }
      }, 0);

      timestamps[i] = Number(timestamps[i - 1] + balanceChange);
    }

    const timestampList = timestamps.map(Number)
    return timestampList?.reverse()
  };

  return {
    createChartData
  }
}
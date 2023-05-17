import { differenceInMilliseconds } from 'date-fns';
import { intervalToDuration } from "date-fns"
// import { TokenIdentifierExtended } from "./useTokens"

export const IPFSURL = "https://nftstorage.link/ipfs/"
export const IPFSURLVideo = "https://nftstorage.link/ipfs/"

export const clamp = (min: number, max: number, amount: number) =>
  Math.max(min, Math.min(max, amount))

export const roundToDecimals = (num: number, decimalPlaces: number) => {
  const number = Math.round(Number(num + "e" + decimalPlaces))
  return Number(number + "e" + -decimalPlaces);
}

export const useHoursLeft = (start: number, end: number) =>
  (end - start) / (1000 * 60 * 60)

export const useDaysLeft = (start: number, end: number) =>
  (end - start) / (1000 * 60 * 60) / 24

export const useIntervalWithDays = (start: number, end: number) => {
  const { minutes, seconds } = intervalToDuration({ start, end })
  const days = Math.floor(useDaysLeft(start, end))
  const hours = Math.floor(useHoursLeft(start, end))
  const hoursLeft = Math.floor(((hours / 24) % 1) * 24)
  // const monthString = formatDistanceStrict(start, end, { unit: 'month', roundingMethod: 'floor' })
  // const months = monthString.split(" ")[0]
  return { days, hours: hoursLeft, minutes, seconds }
}

export const isNumeric = (value: string) => {
  return /^-?\d+$/.test(value)
}


export const logServerTime = (name: string, timeStarted: Date) => {
  const { CHAIN_NET } = useRuntimeConfig().public
  if (CHAIN_NET == 'test') {
    console.log("[SERVER FETCH]", name, differenceInMilliseconds(new Date(), timeStarted))
  }
}

export const useGlobalTimestamp = () => {
  const currentTime = useState('global-timestamp', () => new Date().getTime())

  const setupTimerListener = () => {
    const localTimer = useTimestamp({ interval: 1000 })
    watch(localTimer, (timestamp) => currentTime.value = timestamp)
  }

  return {
    currentTime,
    setupTimerListener
  }
}

export const useTimer = (endTime: number) => {
  const { currentTime } = useGlobalTimestamp()

  const timeLeft = computed(() =>
    useIntervalWithDays(currentTime.value, endTime),
  )


  const addZero = (num: number) =>
    num < 10 ? `0${num}` : num

  const displayedValue = computed(() => {

    const { hours = 0, minutes = 0, seconds = 0 } = timeLeft.value

    const h = hours !== 0 ? `${addZero(hours)}:` : '00:';
    const m = minutes !== 0 ? `${addZero(minutes)}:` : '00:';
    const s = seconds !== 0 ? `${addZero(seconds)}` : '00';
    return `${h}${m}${s}`;
  })

  return displayedValue
}


export const groupBy = (xs: readonly any[], key: string) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});


export const usePlural = (n: number, currentString: string = "") => {
  const loweredString = currentString.toLowerCase()
  const skipPluralize = ['waste', 'energy']
  if (skipPluralize.includes(currentString))
    return ""

  const isLetterSTrailing = loweredString.slice(-1) == "s"
  return (n > 1 && !isLetterSTrailing) ? 's' : ''
}

export const useWait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const reverseKey = <T extends string | number, K extends string>(record: Record<T, K>, findKey: string) =>
  (Object.keys(record) as Array<T>).find(key => record[key] === findKey);

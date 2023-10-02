import { differenceInMilliseconds } from 'date-fns';
import { CredentialsInput } from "#gql"
import { intervalToDuration } from "date-fns"

export const useHelpers = () => {

  return {
    throttle
  }
}

export const useStateBoolean = (key: string, initialValue: boolean) => {
  const state = useState(key, () => initialValue)

  const toggle = () => state.value = !state.value
  const enable = () => state.value = true
  const disable = () => state.value = false

  return {
    state,
    toggle,
    enable,
    disable
  }
}

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
  const { months, days, hours, minutes, seconds } = intervalToDuration({ start, end })
  // const days = Math.floor(useDaysLeft(start, end))
  // const hours = Math.floor(useHoursLeft(start, end))
  // const hoursLeft = Math.floor(((hours / 24) % 1) * 24)

  return { months, days, hours, minutes, seconds }
}

function throttle(func, limit) {
  let lastFunc
  let lastRan
  return function () {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
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

export const useRunOnce = (id: string, fn: () => void) => {
  const hasRun = useState(`use-once-${id}-run`, () => false)

  if (hasRun.value || !process.client)
    return

  hasRun.value = true
  fn()
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


  const addZero = (i) => {
    if (i < 10) return i = `0${i}`;
    return i;
  };

  const displayedValue = computed(() => {

    const { hours, minutes, seconds } = timeLeft.value
    const h = hours !== 0 ? `${addZero(hours)}:` : '00:';
    const m = minutes !== 0 ? `${addZero(minutes)}:` : '00:';
    const s = seconds !== 0 ? `${addZero(seconds)}` : '00';
    return `${h}${m}${s}`;
  })

  return displayedValue
}

export const IPFSURL = "https://nftstorage.link/ipfs/"
export const IPFSURLVideo = "https://nftstorage.link/ipfs/"


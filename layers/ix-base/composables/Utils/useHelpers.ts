import { differenceInMilliseconds } from 'date-fns';
import { intervalToDuration } from "date-fns"
import { CredentialsInput } from "#gql"

export const IPFSURL = "https://nftstorage.link/ipfs/"
export const IPFSURLVideo = "https://nftstorage.link/ipfs/"

// export const useHelpers = () => {
//   return {
//     throttle
//   }
// }

// function throttle(func, limit) {
//   let lastFunc
//   let lastRan
//   return function () {
//     const context = this
//     const args = arguments
//     if (!lastRan) {
//       func.apply(context, args)
//       lastRan = Date.now()
//     } else {
//       clearTimeout(lastFunc)
//       lastFunc = setTimeout(() => {
//         if ((Date.now() - lastRan) >= limit) {
//           func.apply(context, args)
//           lastRan = Date.now()
//         }
//       }, limit - (Date.now() - lastRan))
//     }
//   }
// }



export const formatNumber = (num: number): string => {
  if (Math.abs(num) >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  } else if (Math.abs(num) >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  } else {
    return num.toFixed(2);
  }
}

export const clamp = (min: number, max: number, amount: number) =>
  Math.max(min, Math.min(max, amount))

// export const roundToDecimals = (num: number, decimalPlaces: number) => {
//   const fixedNumber = num?.toFixed(12) ?? 0
//   const number = Math.round(Number(fixedNumber + "e" + decimalPlaces))
//   return Number(number + "e" + -decimalPlaces);
// }

export const roundToDecimals = (num: number | null | undefined, decimalPlaces: number = 2) => {
  if (num == undefined || num == null)
    return 0
  const multiplier = Math.pow(10, decimalPlaces)
  const result = Math.floor(num * multiplier) / multiplier
  return result
}

export const roundUp = (num: number, precision: number) => {
  precision = Math.pow(10, precision)
  return Math.ceil(+num * precision) / precision
}
export const roundDown = (num: number, precision: number) => {
  precision = Math.pow(10, precision)
  return Math.floor(+num * precision) / precision
}

export const useHoursLeft = (start: number, end: number) =>
  (end - start) / (1000 * 60 * 60)

export const useDaysLeft = (start: number, end: number) =>
  (end - start) / (1000 * 60 * 60) / 24

export const useIntervalWithDays = (start: number, end: number) => {
  const { months, days, hours, minutes, seconds } = intervalToDuration({ start, end })
  return { months, days, hours, minutes, seconds }
}

export const isNumeric = (value: string) => {
  return /^-?\d+$/.test(value)
}

export const convertToNumber = (input: number | string) =>
  isNaN(Number(input)) ? 0 : Number(input)

export const notNull = <T>(val: T | null | undefined): val is T => {
  return val !== null && val !== undefined
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

export const useIsKeyNumber = (evt: KeyboardEvent): void => {
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

  if (!keysAllowed.includes(evt.key)) {
    evt.preventDefault()
  }
}

export const makeRandomNumberKey = (length: number) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const reverseKey = <T extends string | number, K extends string>(record: Record<T, K>, findKey: string) =>
  (Object.keys(record) as Array<T>).find(key => record[key] === findKey);


export const scrollParentToChild = (parent: HTMLElement, child: HTMLElement) => {
  // Where is the parent on page
  const parentRect = parent.getBoundingClientRect();
  // What can you see?
  const parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth
  };

  // Where is the child
  const childRect = child.getBoundingClientRect();
  // Is the child viewable?
  const isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parentViewableArea.height);

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // Should we scroll using top or bottom? Find the smaller ABS adjustment
    const scrollTop = childRect.top - parentRect.top;
    const scrollBot = childRect.bottom - parentRect.bottom;

    if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
      // we're near the top of the list
      parent.scrollTop += scrollTop;
    } else {
      // we're near the bottom of the list
      parent.scrollTop += scrollBot;
    }
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

export const useRunOnce = (id: string, fn: () => void) => {
  const hasRun = useState(`use-once-${id}-run`, () => false)

  if (hasRun.value || !process.client)
    return

  hasRun.value = true
  fn()
}

export const allElementsEqual = <T>(items?: T[]) => {
  if (!items || items.length == 0)
    return false

  if (items.every((item) => item == items[0]))
    return items[0]

  return false
}

export const useRouteQueryOptions = <T extends string>(key: string, defaultVal: T, values: T[]) => {
  const router = useRouter()
  const route = useRoute()

  const defaultValue = (() => {

    const query = route.query[key]
    if (values.includes(query as T))
      return query as T

    return defaultVal
  })()

  const state = useState(key, () => defaultValue)

  useRunOnce(`route-${key}`, () => {
    watch(state, (newState) => {
      router.push({
        path: route.path,
        query: {
          ...route.query,
          [key]: newState,
        },
      })
    })
  })

  return state
}

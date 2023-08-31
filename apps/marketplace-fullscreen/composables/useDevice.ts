import { theme } from "@unocss/preset-mini"

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const useDevice = () => {
  const { width } = useWindowSize()
  const mounted = useMounted()

  const getBreakPoint = (breakpoint: Breakpoint) =>
    Number(theme.breakpoints[breakpoint].replace('px', ''))


  const device = computed(() => {
    if (!mounted.value)
      return 'desktop'
    if (width.value < getBreakPoint('md'))
      return 'mobile'

    if (width.value < getBreakPoint('xl'))
      return 'tablet'

    if (width.value < getBreakPoint('2xl'))
      return 'desktop'

    return '4k'
  })

  const isMobile = computed(() => device.value == 'mobile')
  const isTablet = computed(() => device.value == 'tablet')
  const isDesktop = computed(() => device.value == 'desktop')
  const is4K = computed(() => device.value == '4k')

  return {
    isMobile,
    isTablet,
    isDesktop,
    is4K,
    device
  }
}
//add this to useDevice istead of separate composable
export const useMobileBreakpoint = (breakpoint: Breakpoint = 'lg') => {
  const breakWidth = Number(theme.breakpoints[breakpoint].replace('px', ''))
  const isMounted = useMounted()
  const { width } = useWindowSize()
  return computed(() => isMounted.value && width.value < breakWidth)
}
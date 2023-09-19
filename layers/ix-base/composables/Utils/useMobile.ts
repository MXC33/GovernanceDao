import { theme } from "@unocss/preset-mini"

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const useMobileBreakpoint = (breakpoint: Breakpoint = 'lg') => {
  const breakWidth = Number(theme.breakpoints[breakpoint].replace('px', ''))
  const isMounted = useMounted()
  const { width } = useWindowSize()
  return computed(() => isMounted.value && width.value < breakWidth)
}

import { theme } from "@unocss/preset-mini"

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const onMobile = (breakpoint: Breakpoint = 'md') => {
  const breakWidth = Number(theme.breakpoints[breakpoint].replace('px', ''))
  const isMounted = useMounted()
  const { width } = useWindowSize()

  return computed(() => isMounted.value && width.value < breakWidth)
}
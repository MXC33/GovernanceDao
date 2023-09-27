import { MaybeElementRef, MaybeElement } from "@vueuse/core"
import { ComputedRef, Ref } from "vue"

type MaybeEl = MaybeElementRef<MaybeElement>

export const useDraggableMenu = (headerElement: MaybeEl, containerHeight: ComputedRef<number> | Ref<number>) => {
  const isActive = ref(false)
  const currentSnap = ref(0)
  const isOpen = ref(false)
  const isDraggingElement = ref(false)
  const yPosition = ref(0)
  const touchYOrigin = ref(0)
  const { ready: canSnap, start: lockSnap } = useTimeout(100, { controls: true })

  const diffY = computed(() => touchYOrigin.value - yPosition.value)
  const startedDragging = ref(false)

  const { y } = useMouse()

  const { height: headerHeight } = useElementBounding(headerElement, { windowScroll: false })

  const elementStyle = computed(() => {
    if (!isActive.value)
      return {}

    const transition = isDraggingElement.value ? '' : 'all 200ms'
    const pos = isOpen.value ? slidePosition.value : 0

    return {
      transform: `translateY(${0}px)`,
      height: `${Math.floor(Math.abs(pos))}px`,
      transition
    }
  })

  watch(y, (newY) => {
    if (!isDraggingElement.value)
      return

    if (!startedDragging.value) {
      dragActivated()
    }

    yPosition.value = newY

  })

  const touchHandler = (isPressed: boolean) => {
    if (isDraggingElement.value && !isPressed)
      return dragEnd()

    if (!isDraggingElement.value && isPressed)
      return dragStart()
  }

  const dragActivated = () => {
    touchYOrigin.value = y.value
    startedDragging.value = true
  }

  const dragStart = () => {
    isDraggingElement.value = true
  }

  const resetDrag = () => {
    isDraggingElement.value = false
    startedDragging.value = false

    yPosition.value = 0
    touchYOrigin.value = 0
  }

  const dragEnd = () => {
    const slidePos = currentSnap.value - diffY.value
    const isTap = Math.abs(diffY.value) < 5

    resetDrag()

    const closestPoint = closest(slidePos, snapPoints.value)

    nextTick(() => {
      if (isTap)
        tapHeader()
      else
        return snapToPoint(closestPoint)
    })
  }

  const cancelDrag = () => {
    resetDrag()
  }

  const slideDown = () => {
    snapToPoint(snapPoints.value[1])
  }

  const tapHeader = () => {
    const isDown = isFullyDown.value
    return snapToPoint(snapPoints.value[isDown ? 1 : 0])
  }

  const slidePosition = computed(() => {
    const yPos = currentSnap.value - diffY.value
    return lowestPoint(highestPoint(yPos))
  })


  const lowestPoint = (input: number) => Math.min(-headerHeight.value, input)
  const highestPoint = (input: number) => Math.max(-containerHeight.value, input)

  const snapToPoint = (snapPoint: number) => {
    if (!canSnap.value || snapPoint == currentSnap.value)
      return

    currentSnap.value = snapPoint
    lockSnap()
  }

  const closest = (goal: number, counts: number[]) =>
    counts.reduce((prev, curr) =>
      (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
    )

  const snapPoints = computed(() => {
    const point1 = -headerHeight.value
    const point2 = -containerHeight.value * 0.5
    const point3 = -containerHeight.value
    return [point1, point2, point3]
  })

  const isFullyDown = computed(() => {
    return lowestPoint(currentSnap.value) == snapPoints.value[0]
  })

  const toggleOpen = (open: boolean) => {
    isOpen.value = open
  }

  return {
    cancelDrag,
    tapHeader,
    touchHandler,
    slideDown,
    toggleOpen,
    isActive,
    currentSnap,
    slidePosition,
    elementStyle,
  }
}
<template lang="pug">
transition(@enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave" @after-leave="onAfterLeave")
  slot
</template>

<script lang="ts" setup>

const cachedStyles = ref({})
const hasCache = ref(false)


const duration = 300
const easing = 'ease-in-out'
const transition = computed(() =>
  Object.keys(cachedStyles.value).map((key) =>
    `${convertToCssProperty(key)} ${duration}ms ${easing}`
  ).join(', ')
)


const onEnter = (el, done) => {
  detectAndCacheDimensions(el)

  setClosedDimensions(el)
  hideOverflow(el)
  forceRepaint(el)
  setTransition(el)
  setOpenedDimensions(el)

  setTimeout(done, duration)
}

const onAfterEnter = (el) => {
  unsetOverflow(el)
  unsetTransition(el)
  unsetDimensions(el)
  clearCachedDimensions()
}

const onLeave = (el, done) => {
  detectAndCacheDimensions(el)

  setOpenedDimensions(el)
  hideOverflow(el)
  forceRepaint(el)
  setTransition(el)
  setClosedDimensions(el)

  setTimeout(done, duration)
}

const onAfterLeave = (el) => {
  unsetOverflow(el)
  unsetTransition(el)
  unsetDimensions(el)
  clearCachedDimensions()
}

const detectAndCacheDimensions = (el) => {
  if (hasCache.value)
    return

  const visibility = el.style.visibility
  const display = el.style.display

  el.style.visibility = 'hidden'
  el.style.display = ''
  cachedStyles.value = detectRelevantDimensions(el)
  hasCache.value = true

  el.style.visibility = visibility
  el.style.display = display
}

const clearCachedDimensions = () => {
  cachedStyles.value = {}
  hasCache.value = false
}

const detectRelevantDimensions = (el) => ({
  'height': el.offsetHeight + 'px',
  'paddingTop': el.style.paddingTop || getCssValue(el, 'padding-top'),
  'paddingBottom': el.style.paddingBottom || getCssValue(el, 'padding-bottom'),
})


const setTransition = (el) => {
  el.style.transition = transition.value
}
const unsetTransition = (el) => {
  el.style.transition = ''
}

const hideOverflow = (el) => {
  el.style.overflow = 'hidden'
}
const unsetOverflow = (el) => {
  el.style.overflow = ''
}
const setClosedDimensions = (el) => {
  Object.keys(cachedStyles.value).forEach(key => {
    el.style[key] = '0'
  })
}
const setOpenedDimensions = (el) => {
  Object.keys(cachedStyles.value).forEach((key) => {
    el.style[key] = cachedStyles.value[key]
  })
}
const unsetDimensions = (el) => {
  Object.keys(cachedStyles.value).forEach((key) => {
    el.style[key] = ''
  })
}
const forceRepaint = (el) => {
  getComputedStyle(el)['height']
}

const getCssValue = (el, style) => {
  return getComputedStyle(el, null).getPropertyValue(style)
}

const convertToCssProperty = (style) => {
  const upperChars = style.match(/([A-Z])/g)
  if (!upperChars) {
    return style
  }
  for (let i = 0, n = upperChars.length; i < n; i++) {
    style = style.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase())
  }
  if (style.slice(0, 1) === '-') {
    style = style.slice(1)
  }
  return style
}

</script>
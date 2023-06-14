<template lang="pug">
VList(max-h="85" frame="~")
  HList(h="12" px="6 on-small:3" bg="ix-black on-neutral:gray-900" items="center" justify="between" pos="sticky top-0" flex-shrink="0" z="1" @click.stop="dropDrawer" uppercase="~" cursor="pointer" :neutral="isNeutral" :small="isSmall")
    span(color="white" text="md" font="bold" v-if="$slots.header")
      slot(name="header")

    HList(v-else)
      slot(name="titleicon")

    HelperChevron(w="5" :up="isOpen")

  Transition(name="slide-top")
    Collapse(:when="isOpen" class="v-collapse"  overflow-y="auto" )
      slot

</template>

<script lang="ts" setup>
import { Collapse } from 'vue-collapsed'
const { startOpen } = defineProps<{
  startOpen?: boolean
  isSmall?: boolean
  isNeutral?: boolean
}>()

const isOpen = shallowRef(startOpen)

const dropDrawer = () => {
  isOpen.value = !isOpen.value
}

const mounted = useMounted()
watch([mounted, () => startOpen], ([_, open]) => {
  nextTick(() => {
    isOpen.value = open
  })
}, { immediate: true })
</script>


<style>
.v-collapse {
  transition: height 300ms cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
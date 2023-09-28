<template lang="pug">
.no-scrollbar(overflow-x="scroll" overflow-y="hidden" justify="start" ref="container" flex="~ row grow-0 shrink-0" w="full" :id="id" space-x="2" px="2" mx="auto" max-w="full")
  TabsItem(:id="`${id}-tab-${tab}`" :active="activeItem == tab" @click="clickTab(tab)" v-for="(tab, index) in items" :tab-size="tabSize" :is-last="index == items.length - 1" ) 
    slot(name="tab" v-if="$slots.tab" :tab="tab")
    template(v-else-if="tab == 'facility'") industry
    template(v-else) {{ tab }}

</template>

<script setup lang="ts">
import VueScrollTo from 'vue-scrollto'

const container = ref()
const { width } = useElementBounding(container)

const emit = defineEmits(["select"])

const clickTab = (tab: string) => {
  emit('select', tab)
  scrollTo(`#${props.id}-tab-${tab}`)
}

const props = defineProps<{
  activeItem: string,
  id: string,
  items: Readonly<string[]>,
  visibleItems: number
}>()

const tabSize = computed(() => 100 / (props.visibleItems ?? 3))

const scrollTo = (hash: string) => {
  if (!hash)
    return

  VueScrollTo.scrollTo(hash, 200, {
    container: "#" + props.id,
    offset: -1 * (width.value / 3),
    x: true,
    y: false
  })
}
</script>



<style></style>
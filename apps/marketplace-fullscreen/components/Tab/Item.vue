<template lang="pug">
VList(pos="relative")
  HList(font="bold" px="6 on-small:0" py="3" uppercase="~" w="53 on-small:auto" cursor="pointer" @click="toggle" :small="isSmall" items="center" space-x="2")
    span(color="white")
      slot

    HList(pos="relative" w="5" h="5" bg="ix-primary" items="center" justify="center" rounded="full" v-if="hasBids")
      div(color="white" text="xs" leading="1em" translate-y="5.4%" translate-x="-8%")
        slot(name="bids")


  Transition(name="fade-slow")
    div(w="full" b="b-3.43 white on-primary:!ix-primary" z="3" pos="absolute bottom-0" v-if="isActive" :primary="primary")


</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id: string,
  primary?: boolean
  isSmall?: boolean
  hasBids?: boolean
}>()

const activeTab = defineModel<string>()
const isActive = computed(() => activeTab.value && id == activeTab.value)

const toggle = () => {
  activeTab.value = id
}


</script>
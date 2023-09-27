<template lang="pug">
VList(justify="center" flex-grow="1" items="center")
  VList(max-w="150" space-y="2" w="full")
    InfoStory(:id="id" w="full")
      p(v-html="$t(languageKey)")

      slot(name="afterText")

    FoldList(from="row" gap="2" justify="between" items="end" w="full")
      slot(name="leftButton")
        button(btn="~ accent-outline" w="lt-md:full" cut="bottom-right b-$mc-accent" @click="onExit") 
          | {{ $t(`general.exit`) }}

      slot(name="rightButton")
        button(btn="~ accent-filled" w="lt-md:full" cut="bottom-right b-$mc-accent" text="$corporation-over-accent-color" @click="onContinue") 
          | {{ $t(`general.mission-control`) }}

</template>

<script lang="ts" setup>
const id = useActiveCorporation()
const { corporationRouteI18n } = useCorporationRoute()
const { resetComplete } = useCorporationCompletion()
const languageKey = computed(() => {

  if (props.action == 'craft')
    return `corporations.${id.value}.complete`

  const path = corporationRouteI18n.value
  const actionKey = (props.action ? `.${props.action}` : '')

  if (corporationRouteI18n.value.includes('complete'))
    return `corporations.${path}` + actionKey
  else
    return `corporations.${path}.complete` + actionKey
})
const onExit = () => navigateTo(`/${id.value}`)
const onContinue = () => navigateTo(`/mission-control`)

onUnmounted(() => {
  resetComplete()
})

const props = defineProps<{
  action?: string
}>()
</script>
<template lang="pug">
VList(flex-grow="1" min-h="0" bg="$corporation-bg-color") 
  CorporationPageBackground(v-if="showBackground")

  VList(min-h="0" flex-grow="1")
    CorporationWrapper(space-y="4" flex-grow="1" min-h="0" overflow-y="scroll" scrollbar="~ mc")
      HList(h="8 md:13" mt="2 md:3" items="center" w="full" flex-shrink="0" justify="center")
        div(color="$mc-accent" font="bold" text="base md:xl" uppercase="~" flex="grow" w="full")
          slot(name="title")
            TitleWithPointer {{ $t(`corporations.${corporationRouteI18n}.title`) }}

        div(self="end" flex-shrink="0")
          slot(name="header")

        CorporationNavigationButton(@click="$emit('click-back')" v-if="$slots.buttonBack" :is-filled="fillBackButton" cut="bottom-right s-xs" display="md:none" py="1.5")
          slot(name="buttonBack")

      slot 

    slot(name="afterContent")


  CorporationNavigation(v-if="($slots.buttonBack || $slots.buttonNext) && !hideNavigation")
    template(#beforeNavigation)
      slot(name="beforeNavigation")

    template(#default)
      CorporationNavigationButton(@click="$emit('click-back')" v-if="$slots.buttonBack" :is-filled="fillBackButton" cut="bottom-right b-$mc-accent" display="lt-md:none")
        slot(name="buttonBack")

      div(v-else)

      div(flex="~ row" items="end")
        slot(name="beforeButtonNext")

        CorporationNavigationButton(@click="$emit('click-next')" v-if="$slots.buttonNext" :is-disabled="!canProceed" :is-filled="true && !$slots.afterButtonNext" cut="bottom-right b-$mc-accent")
          slot(name="buttonNext")

        slot(name="afterButtonNext")

</template>

<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';

const corporation = useActiveCorporation()
const { corporationRouteI18n } = useCorporationRoute()
const route = useRoute()
const routeParts = computed(() => {
  const routeNormalized = route.path.slice(1)
  return routeNormalized.split("/").filter((item) => item != "")
})

const showBackground = computed(() => routeParts.value.length == 1)

watch(route, (route) => {
  corporation.value = routeParts.value[0] as Corporation
}, { immediate: true })


defineEmits(['click-back', 'click-next'])

defineProps<{
  canProceed?: boolean,
  fillBackButton?: boolean,
  hideNavigation?: boolean
}>()


</script>
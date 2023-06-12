<template lang="pug">
VList(pos="relative" z="1" justify="center" ref="element")
  button(btn="menu")
    HList(items="center" space-x="2" group @click="showMenu = !showMenu")
      GLOBE(w="5" fill="white" )
      div( ) {{ language }}
  
  //-Transition(name="fade-slow")
    HeaderSubmenuWrapper(v-if="showMenu") 
      HeaderSubmenuButton(btn="menu" v-for="text in availableLocales") {{ text }}


</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
import GLOBE from '~/assets/images/header/language-globe.svg'

const showMenu = ref(false)
const element = ref()


const { locales } = useI18n();
const availableLocales = computed(() => 
  locales.value.map((item) => 
    (item as LocaleObject)?.name
  ).filter(notNull)
)

onClickOutside(element, () => showMenu.value = false)

defineProps<{
  language?: string
}>()
</script>
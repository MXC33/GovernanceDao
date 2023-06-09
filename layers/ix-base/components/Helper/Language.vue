<template lang="pug">
HList(items="center" space-x="1.85" group )
  GLOBE(w="5.25" fill="white group-hover:opacity-80" translate-y="-0.3")
  span(translate-y="0.4" @click="toggleMenu = !toggleMenu") {{ language }}

  //-VList(v-if="toggleMenu" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left" z="99") 
    div(@click="toggleMenu = !toggleMenu" bg="black") ENGLISH
    div(@click="toggleMenu = !toggleMenu" bg="black") tiếng Việt 
    div(@click="toggleMenu = !toggleMenu" bg="black") 한글
    div(@click="toggleMenu = !toggleMenu" bg="black") TAGALOG
    div(@click="toggleMenu = !toggleMenu" bg="black") русский язык

  VList(v-if="toggleMenu" pos="absolute top-full left--50% right-0" b="1 gray-400" bg="black" pr="-50%" w="25" items="left" z="99") 
    div(v-for="(text, i ) in arr" @click="toggleMenu = !toggleMenu" b="1 gray-400" text="~ white hover:$mc-orange" ) {{ text }}


</template>

<script lang="ts" setup>
import GLOBE from '~/assets/images/header/language-globe.svg'

const arr = ['ENGLISH', 'tiếng Việt','한글','TAGALOG','русский язык']
const toggleMenu= ref(false);

const changeLanguage = (text: string) => {
  switch(text){
    case "ENGLISH": 
    break;
    case "tiếng Việt": 
    break;
    case "한글": 
    break;
    case "TAGALOG": 
    break;
    case "русский язык": 
    break;
  }
}

defineProps<{
  language?: string
}>()
</script>
<template lang="pug">
div(bg="black")
  HList()
    div(grow="~")
    HList(bg="black" cut="bottom-right")
      Icon(w="10" b="1 $mc-orange")
      VList()
        div(b="1 $mc-orange" text="white") Jane Doe
          div(text="$mc-orange") Account settings
        HList()
          HList(b="1 $mc-orange" p="1" grow="~")
            div() IXT : 
            div(text="green") 2500
          div(b="1 red" p="1") + 
    div(grow="~")
</template>

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';

const Icon = await import(`../../../../assets/images/header/dropdown/badges/aocbadge.svg`).catch(() => FallbackVue)
</script>
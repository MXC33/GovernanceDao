<template lang="pug">
div() {{ name }} 
  </template>
  
<script lang="ts" setup>
import type { IXToken } from '~/composables/Token/useIXToken';
import type { AnyToken } from '~/composables/Token/useTokens';

const props = defineProps<{
  token: AnyToken,
}>()

const CollectionNames: Record<string, string> = {
  "0x836545dfc47f71ff33c458b98b283732a8cee4f6": "Y_ Rovers",
  "0x1d41e6723e7a5d7c889e4220e9b152d6cb84a157": "AOC Badges",
  "0xba6666b118f8303f990f3519df07e160227cce87": "PlanetIX Assets",
  "0xfba348af5f7f7df1b2c8f114004303fde02df6dc": "Corporation Avatars"
}

const name = computed(() => {
  const collection = (props.token as IXToken).collection

  if (collection)
    return CollectionNames[collection]

  else
    return ""
})



</script>
  
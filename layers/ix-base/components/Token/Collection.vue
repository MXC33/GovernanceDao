<template lang="pug">
div() {{ name }} 
  </template>
  
<script lang="ts" setup>
import type { IXToken } from '~/composables/Token/useIXToken';
import type { AnyToken } from '~/composables/Token/useTokens';

const props = defineProps<{
  token: AnyToken,
}>()


const name = computed(() => {
  const collection = (props.token as IXToken).collection

  if (collection)
    return useCollectionName(collection)

  else
    return ""
})

</script>
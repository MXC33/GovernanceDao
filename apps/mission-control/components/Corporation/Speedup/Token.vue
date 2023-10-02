<template lang="pug">
div(color="mc-white" uppercase="~" font="bold") 
  | {{$t(`general.token.${token}`)}}
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

defineProps<{
  token: NftFragment
}>()
</script>
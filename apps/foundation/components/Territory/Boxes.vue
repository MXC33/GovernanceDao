<template lang="pug">
div(grid="~ md:cols-2 gap-default")
  Territory(:data="item" v-for="item in data" v-if="data")

</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';



defineProps<{
  data: StakingItemFragment[]
}>()
</script>
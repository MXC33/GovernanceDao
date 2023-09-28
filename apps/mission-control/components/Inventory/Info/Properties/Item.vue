<template lang="pug">
div(flex="~ col" border="1 on-isCorporation:$mc-accent-40 mc-orange_40" p="y-2" text="xs" grid="col-span-1" :isCorporation="isCorporation" justify="center" items="center")
  p(color="on-isCorporation:$mc-accent-60 mc-orange_60" uppercase="~" :isCorporation="isCorporation") {{ property }}

  // for coordinates property
  div(v-if="property == 'Coordinates'"  v-for="item in value['split'](',')" color="on-isCorporation:$mc-accent mc-orange" :isCorporation="isCorporation")
    p {{ item }}


  p(v-else color="on-isCorporation:$mc-accent mc-orange" :isCorporation="isCorporation") {{ value }}
</template>

<script lang="ts" setup>
defineProps<{
  property: string,
  value?: string | number
  isCorporation?: boolean
}>()
</script>
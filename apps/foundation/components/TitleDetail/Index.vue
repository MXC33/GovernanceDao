<template lang="pug">
VList()

  h6(v-if="$slots.detail" text="detail")
    slot(name="detail")

  HList(text="subheading" space-x="1" items="center")
    h3
      slot

    IXTIcon(w="5" v-if="icon == 'ixt'")
    img(src="~/assets/png/EnergyIcon.png" w="5" v-else-if="icon == 'energy'")

  h6(v-if="$slots.detailBottom" text="detail")
    slot(name="detailBottom")

</template>
  
<script lang="ts" setup>
import IXTIcon from '~/assets/images/token.svg'


defineProps<{
  icon?: 'ixt' | 'energy'
}>()

</script>
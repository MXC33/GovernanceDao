<template lang="pug">
Card()
  template(#default)
    VList()
      div(text="2xl" font="bold") 
        slot(name="title")

      div(text="ix-orange" v-if="$slots.subtitle")
        slot(name="subtitle")

    slot(name="metadata")

    HList(gap-6)
      button(btn="~ primary-outline" @click="$emit('withdraw')") {{ $t('index.withdrawBtn') }}
      button(btn="~ primary-outline" @click="$emit('deposit')") {{ $t('index.depositBtn') }}

  template(#detailBottom)
    ClaimHorizontal()

</template>


<script lang="ts" setup>
defineEmits(['withdraw', 'deposit'])
</script>
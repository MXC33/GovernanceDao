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
      ButtonGlitch(btn="~ primary-outline" cut="~ bottom-right b-ix-primary" @click="$emit('withdraw')" :text="$t('index.withdrawBtn')")
      ButtonGlitch(btn="~ primary-outline" cut="~ bottom-right b-ix-primary" @click="$emit('deposit')" :text="$t('index.depositBtn')")

  template(#detailBottom)
    slot(name="detail")

</template>


<script lang="ts" setup>
defineEmits(['withdraw', 'deposit'])
</script>
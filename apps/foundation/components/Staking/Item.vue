<template lang="pug">
Card()
  template(#default)
    CardTitle(:large="true")
      template(#default)
        slot(name="title")

      template(#subtitle) 
        slot(name="subtitle")

    slot(name="metadata")

    HList(gap="6")
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('index.withdrawBtn')")
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('deposit')" :text="$t('index.depositBtn')")

  template(#detailBottom)
    slot(name="detail")

</template>


<script lang="ts" setup>
defineEmits(['withdraw', 'deposit'])
</script>
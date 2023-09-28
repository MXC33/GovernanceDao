<template lang="pug">
span {{ price }}
</template>
    
<script lang="ts" setup>
const { t } = useI18n()

const price = computed(() => {
  const { price } = props
  return price == 0 ?
    t('general.free') :
    `${price} ${t('general.ixt')}`
})

const props = defineProps<{
  price: number
}>()

</script>
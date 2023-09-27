<template lang="pug">
span {{ price }}
</template>
    
<script lang="ts" setup>
const { t } = useI18n()

const price = computed(() => {
  const { price, paymentMethod } = props
  if (price == 99999)
    return 'Get quota on opensea'
  return price == 0 ?
    t('general.free') :
    `${price} ${paymentMethod}`
})

const props = defineProps<{
  price: number,
  paymentMethod?: string
}>()

</script>
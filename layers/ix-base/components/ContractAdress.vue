<template lang="pug">
NuxtLink(:to="link" :external="true" target="_blank" v-if="adress") 
  span(v-if="isYourWalletAddress" font="bold") You
  template(v-else) {{ strippedAdress }}

</template>

<script setup lang="ts">

const { adress } = defineProps<{
  adress?: string
}>()

const link = computed(() => `https://polygonscan.com/address/${adress}`)

const { walletAdress } = useWallet()

const isYourWalletAddress = computed(() =>
  adress && walletAdress.value?.toLowerCase() == adress?.toLowerCase()
)

const strippedAdress = computed(() => {
  if (!adress)
    return ""

  const first = adress.slice(0, 6)
  const last = adress.slice(-4)
  return `${first}...${last}`
})
</script>
<template lang="pug">
VList(text="white" flex-center="col" space-y="8" p="10 md:5")
  LottieAnimation(w="40 lg:50" :animation-data="WatermelonJSON" :auto-play="true" :loop="true" :speed="2" ref="anim")

  VList(w="full" max-w="110" align="center" space-y="2")
    p(uppercase="~" text="lg lg:2xl" font="bold" leading="tight") {{ title }}

    p(text="white opacity-80" leading="relaxed") 
      slot(name="description")

  slot(name="buttons")

  div(v-if="transactionState == 'extracting'")
    button(btn="~ secondary-outline" @click="resetTransactionState") {{ $t('general.close') }}

</template>

<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue";
import WatermelonJSON from "~/assets/svg/random.json";
const { transactionState, resetTransactionState } = useTransactions()

const anim = ref()

onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  anim.value.play()
})

defineProps<{
  title: string,
}>()

</script>

<style>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}

.spin {
  animation: spin 2s linear infinite;

}
</style>
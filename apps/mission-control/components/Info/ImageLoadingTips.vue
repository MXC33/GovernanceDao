<template lang="pug">
VList(flex-grow="1" items="center" justify="center" space-y="2" w="full")
  img(:src="`${config.public.s3}/tips/${index+1}.jpg`" pos="absolute" z="-2" inset="0" w="full" h="full" object="cover" pointer-events="none")
  HList(w="full" justify="end" p="t-2 r-4")
    button(@click="resetTransactionState" font="bold")
      HList(items="center" space-x="2")
        div(rounded="full"  p="1.5" b="2 white")
          CloseIcon(w="3" fill="white")
        span(text="base" uppercase="~") {{ $t('general.close') }}

  //- Banner
  ColabFluencr()

  VList(flex-grow="1" justify="center" items="center" space-y="4" p="lt-md:2" uppercase="~") 
    VList(corners="~ gray lg" p="2 md:4" max-w="175" space-y="2")
      HList(backdrop="~ blur-md" bg="mc-black opacity-40" flex-grow="1" h="md:54")
        VList(v-if="t(`tips[${index}].image`) != ''" p="l-8 t-8 r-0 b-8 md:l-8 t-8 r-2 b-8" justify="start" flex-grow="1" w="full" align="left")
          span(text="xs" color="white opacity-60") {{ t(`tips[${index}].subtitle`) }}
          span(text="lg md:xl" color="mc-orange"  p="md:y-1")  {{t(`tips[${index}].title`)}}
          span(text="sm" color="white" p="md:y-2")  {{t(`tips[${index}].description`)}}


        VList(v-else p="l-8 t-8 r-8 b-8 md:8" justify="start" flex-grow="1" w="full" align="left")
          span(text="xs" color="white opacity-60") {{ t(`tips[${index}].subtitle`) }}
          span(text="lg md:xl" color="mc-orange"  p="md:y-1")  {{t(`tips[${index}].title`)}}
          span(text="sm" color="white" p="md:y-2")  {{t(`tips[${index}].description`)}}

        VList(justify="center" items="center" p="r-3 md:r-8 t-8 b-8" v-if="t(`tips[${index}].image`) != ''")
          img(:src="icon")

    VList(w="full" px="4")
      HelperTimeFrame(:isTransparentLight="true" color="black" alignment="left" backdrop="blur-md") 
        div(bg="white opacity-60" px="2" py="1" color="mc-black" backdrop="blur-md") {{ title }} 


    VList(w="full" px="4")
      ButtonSound(sound="sm" btn="~ accent hover:opacity-80 on-disable:disable" cut="bottom-right b-$mc-accent"  @click="onClick" backdrop="blur-md") {{ $t(`general.nextTip`) }}

</template>

<script setup lang="ts">
import CloseIcon from '~/assets/images/ui/close.svg'

const { t } = useI18n()
const { resetTransactionState } = useTransactions()

const config = useRuntimeConfig()

const index = ref(Math.floor(Math.random() * 42))
const icon = computed(() => config.public.s3 + t(`tips[${index.value}].image`));

const onClick = () => index.value = Math.floor(Math.random() * 42)

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
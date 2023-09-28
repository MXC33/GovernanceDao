<template lang="pug">
VList(b="1 $mc-accent-40" bg="white opacity-20" cut="bottom-right s-lg")
  header(b="b-1 $mc-accent-40" p="x-3 y-1" font="bold" uppercase="~" text="sm" color="$mc-accent") {{ direction }}:

  VList(p="x-3 y-2")
    HList(items="center" space-x="2" font="bold" )
      TokenImage(:token="data.token" w="12")

      HList(items="center" justify="between" my="6" text="lg" flex-grow="1")
        TokenName(:token="data.token" color="$mc-accent" flex-shrink="0" w="auto")

        AdjustableNumber(v-model="data", v-if="direction == 'from'" min-w="25%")

        HelperIncrementingNumber(:value="outputValue", :decimals="2" min-w="25%" text="center" cursor="default" :duration="1" v-else)

    HList(color="gray-600" text="xs" space-x="2")
      div(uppercase="~ ") {{ $t(`corporations.astro-cap.balance`) }} {{ userBalance }} 
      TokenName(:token="data.token")

</template>

<script lang="ts" setup>
import type { CorporationSwapItem } from '~~/composables/corporations/useCorporationSwap';

const props = defineProps<{
  direction: 'from' | 'to'
  modelValue: CorporationSwapItem,
}>()

const { balanceOfToken } = useUserData()

const { outputValue } = useCorporationSwap()

const userBalance = computed(() => balanceOfToken(props.modelValue.token))

const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)

</script>

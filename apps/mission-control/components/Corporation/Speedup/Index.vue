<template lang="pug">
VList()
  VList(space-y="2")
    slot(name="headline")
      div() {{ astroCreditAndIXTCopy }}


    HList(b="1 mc-mint_40" p="1" items="center" v-if="payments.length > 1")
      CorporationSpeedupSelectToken(:is-active="isSameNFT(payment.token, selectedToken)" v-for="payment in payments" @click="selectToken(payment.token)" w="full" :token="payment.token")

    div(font="bold" uppercase="~") {{$t(`general.timeCost.hours`)}}
    Adjustable(v-model="speedup")

    HelperProgressBar(:progress="progress")

    div(uppercase="~" color="$mc-accent-80" text="xs" p="y2") {{ timeLeft }}

  VList(space-y="2") 
    div(font="bold" uppercase="~") {{$t(`general.timeCost.cost`)}}

    CorporationSpeedupPayment(:payment="currentPayment" :cost="currentCost" v-if="currentPayment" :accented="accented" :state="state")
        
</template>

<script lang="ts" setup>
import type { PaymentOption, SelectedPurchase } from '~/composables/corporations/useSpeedup'
const { t } = useI18n()
const { isSameNFT } = useNFTs()

const props = defineProps<{
  finishTime: number,
  totalTime: number,
  payments: PaymentOption[],
  modelValue: SelectedPurchase,
  maxCost?: number,
  multiplier?: number
  accented?: boolean,
}>()

const finish = computed(() => props.finishTime)

const { selectedToken, timeLeft, progress, speedup, selectToken, currentCost, currentPayment } = useSpeedupOrder(finish, props.totalTime, props.payments, {
  maxCost: props.maxCost,
  multiplier: props.multiplier
})

const state = computed(() => {
  if (props.accented)
    return 'accent'
})

const astroCreditAndIXTCopy = props.payments.length > 1 ? t(`general.reduceTimeACIXT`) : t(`general.reduceTimeIXT`)

const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

watch([selectedToken, speedup], () => {
  data.value = {
    token: selectedToken.value,
    amount: speedup.value.value,
    price: currentPayment.value.cost
  }
}, { immediate: true, deep: true })
</script>
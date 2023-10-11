<template lang="pug">
CorporationCartRow(p="3" gap="3")
  CorporationSpeedup(:finish-time="upgradeFinishTime" :total-time="totalCooldownTime" :payments="speedupPayments" grid="col-span-2" v-model="selectedPurchase" :multiplier="24" :max-cost="ixtBalance" :accented="true")
    template(#headline)
      VList(py="2") {{ $t(`general.upgradeCooldown`) }}

  button(btn="~ accent on-disable:disable" grid="col-span-2" @click="onClickSpeedup" :disable="cantPay") {{ $t(`general.accelerate`) }}

</template>

<script lang="ts" setup>
import type { PaymentOption, SelectedPurchase } from '~/composables/corporations/useSpeedup';
const { execute: fetchCurrency, ixtBalance, ixtToken } = useCurrencyData()
await fetchCurrency()

const selectedPurchase = ref<SelectedPurchase>()

const speedupPayments = computed<PaymentOption[]>(() => [{
  token: ixtToken.value,
  cost: speedupUpgrade.value.cost
}])

definePageMeta({
  layout: 'corporation'
})

const { speedupCooldown } = useFacilityUpgradeContracts()
const onClickSpeedup = async () => {
  await speedupCooldown(selectedPurchase.value.amount, speedupUpgrade.value.cost)
}

const cantPay = computed(() =>
  ixtBalance.value <
  (selectedPurchase.value?.amount * speedupUpgrade.value.cost)
)


const { data: upgradeFinishTime } = useFacilityCooldownTimeleftData()
const { data: upgradeData } = useFacilityUpgradeData()

const totalCooldownTime = 7 * 24 * 60 * 60
const speedupUpgrade = computed(() => ({
  time: upgradeData.value?.orderData.cooldownSpeedupTime,
  cost: upgradeData.value?.orderData.ixtCooldownSpeedupCost
}))

</script>

<template lang="pug">
Card()
  HList()
    CardTitle(flex-grow space-y="2") 
      template(#default) {{ $t(`ixtCatRaff.stake.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.stake.description`) }}
    HList(space-x="1")
      div() Available:
      TitleDetail(:icon="'ixt'")
      div() {{roundToDecimals(ixtBalance)}}

  HList(space-x="2")
    input(type="number" text="bold" :placeholder="'IXT'" bg="gray-900 md:ix-black" px="2" w="full" v-model="amount")
    ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'STAKE IXT'")
</template>

<script lang="ts" setup>


const { addTickets } = useCatRaffStakingContract()
const { ixtBalance } = useCurrencyData()

const amount = ref()

const onClick = () => {
  if (!amount.value)
    return
  return addTickets(amount.value)

}
</script>

<template lang="pug">
VList(flex="~ col" w="lt-md:full")
  div(text="$mc-accent" b="1 $mc-accent" bg="$mc-accent-10" align="center" uppercase="~") {{$t(`general.recommended`)}}

  CorporationNavigationButton(:is-filled="true" @click="onClickSpeedup") {{ $t(`general.accelerate`) }}

</template>

<script lang="ts" setup>
const { gotoLatestSpeedupOrder, activeCorporationOrderId } = useCorporationOrders()

const id = useActiveCorporation()
const onClickSpeedup = () => {
  console.log("GOTO", id.value)
  gotoLatestSpeedupOrder(activeCorporationOrderId.value)
}

</script>
<template lang="pug">
div(pos="relative" mb="10" flex="~ row" justify="between" items="center md:start" w="full" )
  LayoutHeader

    div(bg="mc-orange_10" color="white" b="1 mc-orange_40" text="sm" tracking="wider" divide-x="1" flex="~ row" ) 
      TerminalHeaderButton(:is-active="true") {{$t(`layouts.headers.terminal`)}}

      div(bg="mc-orange_10" p="3" b="mc-orange_40" uppercase="~" tracking="widest") 

        span(color="white opacity-50") {{$t(`layouts.headers.ixt`)}} 
        span(color="mc-mint") {{ Math.round(ixtBalance * 100) / 100 }}

      TerminalHeaderButton(@click="gotoInventory") {{$t(`layouts.headers.inventory`)}}

</template>


<script lang="ts" setup>
const { currencyData } = useUserData()

const ixtBalance = currencyData.value.ixtBalance.balance
const router = useRouter()
const gotoInventory = () => { router.push('/') }

</script>

<style></style>
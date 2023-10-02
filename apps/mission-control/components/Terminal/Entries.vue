<template lang="pug">
div(grid="~ md:cols-3 gap-4" text="white" min-w="0")

  TerminalEntry(background-style="inventory" @open="router.push('/')")
    template(v-slot:logo)
      InventoryLogo()

    template(v-slot:default) {{$t(`game.terminal.descriptions.inInventory`)}}

  TerminalEntry(background-style="netempire" @open="gotoIXPage('game')")
    template(v-slot:logo)
      NetEmpire(max-w="40")

    template(v-slot:default) {{$t(`game.terminal.descriptions.explore`)}}

  TerminalEntry(background-style="mc" @open="router.push('/mission-control')")
    template(v-slot:logo)
      MissionControl(max-w="50")

    template(v-slot:default) {{$t(`game.terminal.descriptions.inMissionCtrl`)}}

</template>


<script lang="ts" setup>
import InventoryLogo from '~/assets/images/terminal/inventory.svg'
import NetEmpire from '~/assets/images/terminal/netempire.svg'
import MissionControl from '~/assets/images/ui/logos/mc.svg'

const router = useRouter()
const { gotoIXPage } = useIXLinks()
</script>

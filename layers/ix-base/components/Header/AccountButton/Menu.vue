<template lang="pug">
HeaderSubmenuWrapper(:align-right="true")
  VList(b="gray-400" divide-y="1")
    slot(name="dropdown")
    HeaderSubmenuButton(v-if="ixtBalance != undefined" b="gray-400" @click="showIXTSwap")
      HList(space-x="1" items="center")
        div(font="bold") ADD IXT

    NuxtLink(to="/logout" b="gray-400")
      HeaderSubmenuButton() {{ $t(`general.navigation.menu.logout`)}}

</template>

<script lang="ts" setup>
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
//SVG

const { enable: showIXTSwap } = useIXTSwapVisible()
const { ixtBalance } = useIXTContract()
</script>

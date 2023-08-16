<template lang="pug">
PopupFrame(:hideBackButton="true")
  template(#content)
    VList(p="4" pb="8" border-solid="~" border-gray-700="~" z="3" text="md" font="400" color="$mc-whitenew" space-y="8")
      div() Better your chances with ticket entries!
      div()
        Adjustable(v-model="lotteryEntries"  w="full" :is-neutral="true" frame="~ hover:gray-300")
        div(mt="1" text="3" color="gray-200") Your entries {{lotteryEntries.value}}

    VList(p="4" border-t="~" border-solid="~" border-gray-700="~" z="3" text="base" font="400" color="$mc-whitenew" space-y="4")
      VList(space-y="2")
        HList(justify="between" flex-shrink="0")
          span() Total ticket entries
          span() {{lotteryEntries.value}}

        HList(justify="between" flex-shrink="0")
          span() Total price
          span() {{ lotteryEntries.value *  IXT_PER_ENTRY }} IXT

      VList()
        ButtonSound(@click="onEnterLottery" sound="sm" btn="~ primary" opacity="s-invalid:50" w="full" font="bold" transition="all" ref="button" pos="relative" pointer-events="s-loading:none s-invalid:none")
          span() Enter
</template>

<script lang="ts" setup>
import {useEnterLottery, useEnterLotteryContract} from "~/composables/useEnterLottery";

const { enterLottery } = useEnterLotteryContract()
const { lotteryEntries, IXT_PER_ENTRY } = useEnterLottery()

const onEnterLottery = async () => {
  try {
    console.log(await enterLottery(lotteryEntries.value.value))
  } catch (e) {
    console.log('fisky e', e)
  }
}

</script>

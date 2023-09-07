<template lang="pug">
Popup()
  template(#content)
    HList(items="center" justify="between" p="4" b="b-1 ix-white opacity-60")
      WalletBalanceAgold()

    VList(flex-grow="1" p="4" space-y="4" b="b-1 ix-white opacity-60" text="md" font="normal")
      p() Choose ticket amount
      VList(h="14")
        HelperAdjustable(v-model="lotteryEntries")
        //Adjustable(v-model="lotteryEntries")

  template(#footer)
    HList(items="center" justify="between")
      span() Total ticket entries
      span() 1
    HList(items="center" justify="between" mt="2")
      span() Total price
      span() 10 AGOLD

    Button(:value="'pink'" w="full" mt="5") Purcahse

</template>
<script lang="ts" setup>
const {
  lotteryEntries
} = useEnterLottery()

</script>

<template lang="pug">
Card()
  HList(space-x="6" items="center")
    PageSection(section="ixtStaking")
    Card(flex="")
        TitleDetail(icon="ixt")
          template(#default) {{ roundToDecimals(ixtBalance, 2) }}
          template(#detail) Wallet IXT Balance
    
  Card(space-x="3")
    HList(space-x="1")
      div() Available:
      TitleDetail(:icon="'ixt'")
    HList(space-x="2")
      input(type="number" text="bold" :placeholder="'IXT'" bg="gray-900 md:ix-black" px="2" w="full" v-model="amount")
      Disabler(:disabled="ixtBalance == 0")
    HList()
      ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'STAKE IXT'")
      ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'WITHDRAW IXT'")
  HList(border="solid white 1")
      div() Available:
        TitleDetail(:icon="'ixt'")

</template>

<script lang="ts" setup>
const { ixtBalance } = useCurrencyData();
</script>

<template lang="pug">
VList(space-y="6" items="center")

  div.Uniswap
    UniswapWidget(:theme="darkTheme" defaultInputTokenAddress="NATIVE"   :defaultOutputTokenAddress="token" :tokenList="tokenList" :defaultChainId="0")

  p(color="white" text="center sm" opacity="80") If transaction fails, increase the slippage

</template>
  
<script lang="ts" setup>
import '@fontsource-variable/inter';
//@ts-ignore
import { darkTheme, SwapWidget } from '@uniswap/widgets'
//@ts-ignore
import { applyReactInVue } from 'veaury';

const tokenList = [
  {
    "chainId": 1,
    "address": "0xf538296e7dd856af7044deec949489e2f25705bc",
    "decimals": 18,
    "name": "Milk",
    "symbol": "MILK"
  }
];

const UniswapWidget = applyReactInVue(SwapWidget)
const { token } = useRuntimeConfig().public
</script>
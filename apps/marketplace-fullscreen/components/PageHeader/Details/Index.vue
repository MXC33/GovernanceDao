<template lang="pug">
Transition(name="slide-top")
  div(p="6" grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" w="full" text="2xl Orange" bg="black")
    PageHeaderDetailsTitle(v-for="stringIndexX in StringDetails.length" :title="StringDetails[stringIndexX - 1][0]")  
      //- {{ StringDetails[stringIndexX - 1][0] }}
      PageHeaderDetailsInfo(v-for="stringIndexY in StringDetails[stringIndexX - 1].length - 1" :title="StringDetails[stringIndexX - 1][stringIndexY]") 

</template> 

<script lang="ts" setup>
const StringDetails = [
  ["Swap", "Swap To IXT"], 
  ["Brige","Polygon", "Etherum"], 
  ["Supply", "IXT/USDT", "IXT/MATIC"], 
  ["Capital", "Lend Capital", "Sell Capital",],
]  
</script>
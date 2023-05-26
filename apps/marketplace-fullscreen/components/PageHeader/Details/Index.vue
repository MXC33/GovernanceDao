<template lang="pug">
Transition(name="slide-top")
  div(p="6" grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" w="full" flex="~" text="2xl Orange" bg="black")
    PageHeaderDetailsTitle(items="center" 
    v-for="stringIndexX in stringTitles.length" 
    :title="stringTitles[stringIndexX - 1][0]")  
      PageHeaderDetailsDescription(
        v-for="stringIndexY in stringTitles[stringIndexX - 1].length - 1" 
        :title="stringTitles[stringIndexX - 1][stringIndexY]"
        :description="descriptionArr[stringIndexX - 1][stringIndexY - 1]") 
</template> 

<script lang="ts" setup>
// import data from '~/lang/en-US.json';
// const stringTitles = data.mpFullscreen.headers.buyIxtDropDown.stringTitles
// const stringTitlesDetails = data.mpFullscreen.headers.buyIxtDropDown.stringTitlesDetails

const props = defineProps<{
  stringTitles: string[][],
  descriptionArr: string[][],
}>()

</script>
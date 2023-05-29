<template lang="pug">
div()
  HList(group p="3")
    //-TitleIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange")
    HeaderDetailsIcon(:image="subHeaderObject.image" fill="white group-hover:$mc-orange")
    VList( )
      div(color="white group-hover:$mc-orange" text="16px" ) {{subHeaderObject.title}} 
      div(color="gray-200 group-hover:$mc-orange" ) {{ subHeaderObject.description }}
</template>

<script lang="ts" setup>
import TitleIcon from '~/assets/icons/trash.svg'
import type { SubHeaderObject } from '~/composables/useSiteHeader';

const enter = () =>{
  console.log("enter");
}

const props = defineProps<{
  subHeaderObject: SubHeaderObject
}>()



</script>
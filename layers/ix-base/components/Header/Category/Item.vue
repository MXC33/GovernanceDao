<template lang="pug">
HList(group p="3" space-x="3")
  //-TitleIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange")
  HeaderCategoryIcon(:header="header" :item="item" :category="category" fill="white group-hover:$mc-orange")
  VList( )
    div(color="white group-hover:$mc-orange") {{ $t(`${langPath}.title`)}} 
    div(color="gray-200 group-hover:$mc-orange" text="sm") {{ $t(`${langPath}.description`) }}
</template>

<script lang="ts" setup>
const enter = () =>{
  console.log("enter");
}

const imagePath = computed(() => [header, category, item].join('/'))
const langPath = computed(() => `marketplace.headers.${header}.${category}.${item}`)

const {header, category, item} = defineProps<{
  header: string,
  category: string,
  item: string
}>()



</script>
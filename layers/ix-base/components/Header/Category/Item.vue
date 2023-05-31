<template lang="pug">
div()
  HeaderLink(:to="linkPath")
    HList(group p="3" space-x="3" pos="right-0")
      //-TitleIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange")
      HeaderCategoryIcon(w="10" h="10" :header="header" :item="item" :category="category" fill="white group-hover:$mc-orange")
      VList( )
        div(color="white group-hover:$mc-orange") {{ $t(`${langPath}.title`)}} 
        div(color="gray-200 group-hover:$mc-orange" text="sm") {{ $t(`${langPath}.description`) }}
</template>

<script lang="ts" setup>

const { t } = useI18n()
const enter = () =>{
  console.log("enter");
}

const imagePath = computed(() => [header, category, item].join('/'))
const langPath = computed(() => `marketplace.headers.${header}.${category}.${item}`)

const linkPath = computed(() => t(`marketplace.headers.${header}.${category}.${item}.link`))

console.log(linkPath.value)
const {header, category, item} = defineProps<{
  header: string,
  category: string,
  item: string
}>()



</script>
<template lang="pug">
NuxtLink(:to="linkPath" cursor="pointer")
  HList(group p="3" space-x="3" pos="right-0" text="left")
    //-TitleIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange")
    HeaderCategoryIcon(w="8" :header="header" :item="item" :category="category" fill="white group-hover:$mc-orange" flex-shrink="0")
    div(pos="relative")
      VList(pos="relative" v-if="linkPath")
        div(color="white group-hover:$mc-orange") {{ $t(`${langPath}.title`)}} 
        div(color="gray-200 group-hover:$mc-orange" text="sm" ) {{ $t(`${langPath}.description`) }}
      VList(pos="relative" v-if="!linkPath")
        div(color="gray") {{ $t(`${langPath}.title`)}}
        div(color="$mc-orange" text="sm" ) {{ $t(`marketplace.headers.soon`)}}
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
<template lang="pug">
NuxtLink(:to="linkPath" cursor="pointer")
  VList(p="3" space-y="2" group)
    HeaderCategoryIcon(w="8" :header="header" :item="item" :category="category" fill="white group-hover:$mc-orange" flex-shrink="0")
    VList(v-if="linkPath")
      div(color="white group-hover:$mc-orange") {{ $t(`${langPath}.title`)}} 
      div(color="gray-200 group-hover:$mc-orange" text="sm") {{ $t(`${langPath}.description`) }}
    VList(v-if="!linkPath")
      div(color="gray") {{ $t(`${langPath}.title`)}} 
      div(color="$mc-orange" text="sm") {{ $t(`marketplace.headers.soon`)}}
</template>
  
<script lang="ts" setup>
const { t } = useI18n()
const langPath = computed(() => `marketplace.headers.${header}.${category}.${item}`)
const linkPath = computed(() => t(`marketplace.headers.${header}.${category}.${item}.link`))
const {header, category, item} = defineProps<{
  header: string,
  category: string,
  item: string
}>()
</script>
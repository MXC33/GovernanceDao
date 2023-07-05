<template lang="pug">
NuxtLink(:to="linkPath" cursor="pointer")
  VList(p="3" space-y="2" group)
    HeaderCategoryIcon(w="8" :header="header" :item="item" :category="category" fill="white group-hover:ix-orange" flex-shrink="0")
    VList(v-if="linkPath || isNotLink()")
      div(color="white group-hover:ix-orange" uppercase ="~") {{ $t(`${langPath}.title`)}} 
      div(color="gray-200 group-hover:ix-orange" text="sm") {{ $t(`${langPath}.description`) }}
    VList(v-else)
      div(color="gray" uppercase ="~") {{ $t(`${langPath}.title`)}} 
      div(color="ix-orange" text="sm") {{ $t(`marketplace.navigation.soon`)}}
</template>
  
<script lang="ts" setup>
const { t } = useI18n()
const langPath = computed(() => `marketplace.navigation.${header}.${category}.${item}`)
const linkPath = computed(() => t(`marketplace.navigation.${header}.${category}.${item}.link`))
const {header, category, item} = defineProps<{
  header: string,
  category: string,
  item: string
}>()

const isNotLink = () => {
  switch (item) {
    case 'swap':
      return true
  }

  return false
}
</script>
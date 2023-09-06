<template lang="pug">
NuxtLink(:to="linkPath" cursor="pointer" )
  HList(group p="3" space-x="3" pos="right-0" text="left" )
    //-TitleIcon(w="10" h="10" p="1" fill="white group-hover:ix-orange")
    HeaderCategoryIcon(w="8" :header="header" :item="item" :category="category" fill="white group-hover:ix-orange" flex-shrink="0")
    div(pos="relative" )
      VList(pos="relative" v-if="linkPath || isNotLink()")
        div(color="white group-hover:ix-orange" uppercase ="~") {{ $t(`${langPath}.title`)}}
        div(color="gray-200 group-hover:ix-orange" text="sm" ) {{ $t(`${langPath}.description`) }}
      VList(pos="relative" v-else)
        div(color="gray" uppercase="~") {{ $t(`${langPath}.title`)}}
        div(color="gray-200" text="sm" ) {{ $t(`marketplace.navigation.soon`)}}
</template>

<script lang="ts" setup>

const { t } = useI18n()
const enter = () => {
  console.log("enter");
}

const imagePath = computed(() => [header, category, item].join('/'))
const langPath = computed(() => `marketplace.navigation.${header}.${category}.${item}`)

const linkPath = computed(() => t(`marketplace.navigation.${header}.${category}.${item}.link`))
const hasDescription = computed(() => t(`marketplace.navigation.${header}.${category}.${item}.description`))


//console.log(linkPath.value)
const { header, category, item } = defineProps<{
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

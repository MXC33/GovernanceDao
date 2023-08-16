<template lang="pug">
VList(flex-grow="1" w="full")
  VList(v-for="header in headerData")
    //-div(v-for="navigation in header.subNavigations") {{ navigation.title }}
    //-CollectionFilterDrawer(bg="black")
    //-div(v-for="navigation in header.subNavigations") {{ navigation.title }} 
    CollectionFilterDrawer(bg="black")
      template(#header) 
        div {{ header.name }}

      template(#default)
        //-div(v-for="navigation in header.subNavigations") {{ navigation.title }} 
        HeaderNavigationMenuSubNavigation(:navigation="navigation" v-for="navigation in header.subNavigations")
</template>

<script lang="ts" setup>
const {data: headerData} = useHeaderData()
console.log(headerData)
</script>
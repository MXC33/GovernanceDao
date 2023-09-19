<template lang="pug">
VList(flex-grow="1" w="full")
  VList(v-for="header in headerData")
    Drawer(bg="black")
      template(#header) 
        div {{ header.name }}

      template(#default)
        HeaderNavigationMenuSubNavigation(:navigation="navigation" v-for="navigation in header.subNavigations")
</template>

<script lang="ts" setup>
const { data: headerData } = useHeaderData()
</script>
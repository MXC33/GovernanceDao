<template lang="pug">
VList(flex-grow="1" w="full")
  VList(v-for="header in headerData")
    Drawer(bg="black")
      template(#header) 
        div {{ adjustedTitle(header.name) }}

      template(#default)
        HeaderNavigationMenuSubNavigationMobile(:navigation="navigation" v-for="navigation in header.subNavigations")
</template>

<script lang="ts" setup>
const { data: headerData } = useHeaderData()

const adjustedTitle = (title: string) => {
  if (title == "COMMUINTY")
    return "COMMUNITY"

  return title
}

</script>
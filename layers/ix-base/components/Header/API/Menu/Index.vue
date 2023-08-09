<template lang="pug">
div()
  VList(flex-grow="1" w="full" display="lg:none")
    VList(v-for="header in headerData")

      HeaderAPIDrawer(bg="black")
        template(#header) 
          div {{ header.name }}

        template(#default) 
          HeaderAPIMenuSubNavigation(:navigation="navigation" v-for="navigation in header.subNavigations")
</template>

<script lang="ts" setup>
const {data: headerData} = useHeaderData()
console.log(headerData)
</script>
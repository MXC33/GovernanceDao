<template lang="pug">
div()
  DefineMenuItems()
    HeaderSubnavigationItem(:path="`/${route}`" v-for="route in routes") 
      | {{ $t(`foundation.menu.${getRoute(route)}`) }}

  div(bg="gray-900" display="lt-md:none" )
    div(grid="~ cols-3 lg:cols-7" max-w="300" mx="auto" px="4 lg:8"  mb="8" font="bold")
      ReuseMenuItems()

  ClientOnly()
    Drawer(bg="black" display="md:none" mb="3" ref="drawer" :start-open="false")
      template(#header) 
        div {{ $t(`foundation.menu.${getRoute(String(route.name))}`) }}

      template(#default)
        ReuseMenuItems()

</template>

<script lang="ts" setup>
const [DefineMenuItems, ReuseMenuItems] = createReusableTemplate();

const route = useRoute();

const routes = [
  "",
  "territories",
  "landmarks",
  "metashare",
  "energy",
  "ixtcatraff",
  "governance",
];

const getRoute = (path: string) => {
  if (path == "") return "index";

  return path;
};

const drawer = ref();

watch(
  () => route.path,
  () => {
    drawer.value.close();
  },
);
</script>

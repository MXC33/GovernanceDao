<template lang="pug">
HList(space-x="3" uppercase="~" text="sm" font="bold" cursor="default")
  template(v-for="(page, index) in pages") 

    HList(b="md:1 $mc-accent" p="1 r-2" items="center" min-w="md:30" opacity="on-active:100 30" bg="on-active:md:$mc-accent-20" transition="all" filter="on-active:none grayscale-100" cut="md:bottom-right" :active="isActive(page)")

      TitleWithPointer(display="block md:none")

      div(bg="$mc-accent" w="6" h="6" text="center black" flex-center="row" display="none md:flex") {{ index + 1 }}

      div(text="$mc-accent sm" ml="md:2") {{ page }} 
    
</template>

<script lang="ts" setup>
const isActive = (page: string) => page == props.activePage

const props = defineProps<{
  activePage: string,
  pages: string[] | Readonly<string[]>,
}>()
</script>
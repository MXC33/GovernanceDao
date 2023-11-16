<template lang="pug">
HList(space-x="6" items="center")
  VList()
    VList(rounded="full" b="1 pink" p="3" aspect="square" pos="relative" w="24" items="center" justify="center")
      div(w="80%" h="80%" pos="relative")
        img(:src="`/images/how/${item}.svg`" pos="image" object="contain")

  VList()
    h3(text="2xl pink" font="bdra") {{ $t(`how.${item}.title`) }}
    div(font="prime") {{ $t(`how.${item}.description`) }}

</template>

<script lang="ts" setup>
const { item } = defineProps<{
  item: string
}>()
</script>
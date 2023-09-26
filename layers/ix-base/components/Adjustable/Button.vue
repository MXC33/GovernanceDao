<template lang="pug">
ButtonSound(sound="sm" h="full" transition="all" cursor="pointer" items="center" justify="center" pointer-events="on-adjustable:auto none" filter="on-adjustable:none grayscale-100" opacity="on-adjustable:100 50 hover:60!" :adjustable="isAdjustable" uppercase="~" :inline="inline" flex="~ row" px="4")
  component(v-if="type" :is="icon" w="3" h="3" fill="inherit")
  slot(v-else)
</template>

<script lang="ts" setup>
import MinusButton from "~/assets/images/icons/minus.svg"
import PlusButton from "~/assets/images/icons/plus.svg"

const icon = computed(() => {
  switch (props.type) {
    case "plus":
      return PlusButton
    case "minus":
      return MinusButton
  }
});

const props = defineProps<{
  type?: "plus" | "minus",
  text?: string
  inline?: boolean,
  isAdjustable?: boolean
  hasFrame?: boolean
}>();

</script>
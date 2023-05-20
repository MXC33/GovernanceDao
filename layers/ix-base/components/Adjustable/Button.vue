<template lang="pug">
ButtonSound(sound="sm" h="full" bg="gray-600 hover:gray-500" transition="all" cursor="pointer" p="2" flex="~ row" items="center" justify="center" aspect="square"  pointer-events="on-adjustable:auto none" filter="on-adjustable:none grayscale-100" opacity="on-adjustable:100 50" :adjustable="isAdjustable" uppercase="~" :inline="inline")
  component(v-if="type" :is="icon" w="3" h="3" fill="white")
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
}>();

</script>
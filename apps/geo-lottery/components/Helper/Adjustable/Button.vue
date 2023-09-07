<template lang="pug">
ButtonSound(sound="sm" btn="~ secondary on-inline:inline" b="on-inline:!0" h="full" bg="transparent" transition="all" cursor="pointer" p="2" flex="~ row" items="center" justify="center" aspect="square"  pointer-events="on-adjustable:auto none" filter="on-adjustable:none grayscale-100" opacity="on-adjustable:100 40" :adjustable="isAdjustable" uppercase="~" :inline="inline")
  component(v-if="type" :is="icon" w="3" h="3" fill="ix-white")
  slot(v-else)
</template>

<script lang="ts" setup>
import MinusButton from "~/assets/icons/minus.svg"
import PlusButton from "~/assets/icons/plus.svg"

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
  inline?: boolean,
  isAdjustable?: boolean
}>();

</script>

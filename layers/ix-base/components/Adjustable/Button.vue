<template lang="pug">
ButtonSound(sound="sm" btn="~ secondary on-inline:inline" b="on-inline:!0" h="full" bg="$mc-secondary_10" transition="all" cursor="pointer" p="2" flex="~ row" items="center" justify="center" aspect="square"  pointer-events="on-adjustable:auto none" filter="on-adjustable:none grayscale-100" opacity="on-adjustable:100 50" :adjustable="isAdjustable" uppercase="~" :inline="inline")
  component(v-if="type" :is="icon" w="3" h="3" fill="$mc-secondary")
  slot(v-else)
</template>

<script lang="ts" setup>
import MinusButton from "~/assets/images/ui/minus.svg?component"
import PlusButton from "~/assets/images/ui/plus.svg?component"

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
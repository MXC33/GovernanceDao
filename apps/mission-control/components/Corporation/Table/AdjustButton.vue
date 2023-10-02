<template lang="pug">
button(btn="~ accent" bg="$mc-accent-10" transition="all" cursor="pointer" aspect="square" h="full" p="2" flex-center="row" pointer-events="on-adjustable:auto none" filter="on-adjustable:none grayscale-100" opacity="on-adjustable:100 50" :adjustable="isAdjustable" uppercase="~")
  component(v-if="type" :is="icon" w="3" h="3" fill="$mc-accent")
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
  isAdjustable?: boolean
}>();

</script>
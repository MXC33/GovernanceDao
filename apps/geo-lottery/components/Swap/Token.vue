<template lang="pug">
HList(flex="~" justify="between" items="center" w="full" text="md" font="normal" color="white" b="1 ix-white opacity-40" rounded="lg" bg="ix-white opacity-20" p="x-4 y-2" cursor="pointer")
  HList(space-x="4" items="center")
    HList(v-if="$slots.icon")
      slot(name="icon")
    VList()
      VList(v-if="$slots.title" text="md" font="bold" color="white" uppercase="~")
        slot(name="title")
      VList(v-if="$slots.balance" text="sm" font="normal" color="ix-white opacity-60" uppercase="~")
        slot(name="balance")

  HList(space-x="2" items="center")
    strong(v-show="disabledValue" opacity="40") {{disabledValue}}
    InputAdjustableNumber(v-show="!disabledValue" text="right" v-model="data" )

</template>
<script lang="ts" setup>
import type { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";

const props = defineProps<{
  modelValue: AdjustableNumber,
  disabledValue?: string | number
}>()

const emit = defineEmits(["update:modelValue"])
const data = useVModel(props, 'modelValue', emit)
</script>

<template lang="pug">
input(outline="none" appearance="none" placeholder="0" b="none" bg="white opacity-0" w="full" text="lg center on-invalid:red-500" color="$corporation-text-color"  font="bold" v-model="data" @keyup.enter="updateAmount" @focusout="updateAmount")
</template>

<script lang="ts" setup>
import {convertToNumber} from "@ix/base/composables/Utils/useHelpers";

const props = defineProps<{
  modelValue: number | string
}>()

const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

const updateAmount = (e: any) => {
  data.value = convertToNumber(e.target.value)
}
</script>

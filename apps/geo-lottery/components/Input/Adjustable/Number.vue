<template lang="pug">
input(
  outline="none" appearance="none" placeholder="0" b="none" bg="white opacity-0" w="full" text="lg center on-invalid:red-500" color="$corporation-text-color"  font="bold"
  v-model="data.value"
  @keyup.enter="updateAmount"
  @focusout="updateAmount"
  :invalid="invalidNumber"
)
</template>

<script lang="ts" setup>
import type { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";


const data = defineModel<AdjustableNumber>()

const updateAmount = (e: any) => setValue(e.target.value)

//@ts-ignore
const { invalidNumber, setValue } = useAdjustableNumber(data)

</script>

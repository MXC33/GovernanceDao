<template lang="pug">
VList(lt-md:px="4" p="lt-md:b-6" justify="md:end" space-y="3")
  Adjustable(v-model="value" h="full" :is-neutral="true")
  span(color="yellow-200" v-if="$slots.error")
    slot(name="error")

</template>

<script lang="ts" setup>
import type { AdjustableNumber } from '@ix/base/composables/Utils/useAdjustableNumber';

const value = defineModel<AdjustableNumber>()
</script>

<style scoped ></style>

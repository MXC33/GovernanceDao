<template lang="pug">
VList(justify="md:end" pt="lt-md:6" space-y="3" w="full lt-md:full" flex-grow="1")

  HList(justify="end")
    Adjustable(v-model="value" h="full" w="full md:50%" :is-neutral="true" :has-frame="true")

  HList(w="full" justify="end" v-if="$slots.error")
    span(color="gray-200")
      slot(name="error")

</template>

<script lang="ts" setup>
import type { AdjustableNumber } from '@ix/base/composables/Utils/useAdjustableNumber';

const value = defineModel<AdjustableNumber>()
</script>

<style scoped ></style>

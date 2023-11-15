<template lang="pug">
GlitchText(upperacse="~" :text="String(String(amount) == '' ? 0 : amount)" :suffix="' ' + $t('general.' + i18n, Number(amount) ?? 0)")

</template>

<script lang="ts" setup>
defineProps<{
  amount: string | number,
  i18n: string
}>()
</script>
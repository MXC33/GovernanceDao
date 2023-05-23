<template lang="pug">
ButtonSound(sound="sm" bg="gray opacity-30 hover:opacity-50 on-checked:(mc-mint opacity-60) on-error:mc-red" rounded="full" w="10" h="5" cursor="pointer" transition="all" @click.stop="toggle" :checked="isChecked" :error="isError")
  div(aspect="square" h="full" rounded="full" bg="white" translate-x="on-checked:full" transition="all" :checked="isChecked")

</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean,
  isError?: boolean
}>()

const emit = defineEmits(["update:modelValue"])
const isChecked = useVModel(props, 'modelValue', emit)
const toggle = () => isChecked.value = !isChecked.value
</script>

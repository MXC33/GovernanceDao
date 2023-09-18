<template lang="pug">
div.textfield(v-once contenteditable="true" @input="update" @keypress.stop="onKeypress" v-text="modelValue" ref="element" outline="none" display="inline-block" cursor="text")

</template>
  
<script setup lang="ts">
const element = ref<HTMLElement | null>()

const props = defineProps<{
  modelValue: string,
}>()

const emit = defineEmits({
  'update:modelValue': String,
})

const data = useVModel(props, 'modelValue', emit)

const currentContent = () =>
  element.value?.innerText ?? ""

const update = () => {
  data.value = currentContent()
}

onBeforeUnmount(() => update())

const finishEditing = () => {
  element.value.blur()
  window.getSelection()?.removeAllRanges()
}


const onKeypress = (event: KeyboardEvent) => {
  const isEnter = event.key == 'Enter'

  if (isEnter || event.key == 'Esc') {
    event.preventDefault()
    finishEditing()
  }
}

</script>

<style>
.textfield[placeholder]:empty::before {
  content: attr(placeholder);
  color: #555;
}

.textfield[placeholder]:empty:focus::before {
  content: "";
}
</style>
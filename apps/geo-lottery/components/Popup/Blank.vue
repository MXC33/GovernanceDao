<template lang="pug">
Transition(name="fade" appear)
  VList(pos="fixed" inset="0" bg="black opacity-80" w="full" h="full" z="999" items="center" justify="center" @click="onClose" backdrop-blur-sm)
    slot()
</template>

<script setup lang="ts">
const { closeActivePopup } = usePopups()

const onClose = () => {
  if (!disableDefaultClose)
    closeActivePopup()
  emit("close")
}

const { disableDefaultClose } = defineProps<{
  disableDefaultClose?: boolean
}>()

const emit = defineEmits(["close"])
</script>

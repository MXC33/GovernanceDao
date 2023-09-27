<template lang="pug">
PopupBase(@close="onClose")
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
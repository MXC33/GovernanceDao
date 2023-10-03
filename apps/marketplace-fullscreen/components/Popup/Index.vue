<template lang="pug">
PopupBase(@close="onClose")
  template(v-for="(_, name) in $slots" v-slot:[name]="slotProps")
    slot(:name="name" v-bind="slotProps")

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
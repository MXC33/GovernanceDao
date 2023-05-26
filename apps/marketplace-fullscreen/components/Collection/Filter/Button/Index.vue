<template lang="pug">
HList(cut="top-right sm" bg="gray-600 hover:gray-500" items="center" space-x="4" px="3" py="2" cursor="pointer" @click="$emit('close')" group)
  span(color="gray-200 group-hover:gray-100" text="sm" translate-y="0.5" font="bold")
    slot()
  CloseIcon(w="3")
</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/icons/close.svg'

</script>
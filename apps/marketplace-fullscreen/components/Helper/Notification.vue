<template lang="pug">
VList(pos="sticky bottom-6" z="300" @click="$emit('close')" w="full" items="end" px="6")  
  VList(frame="~ gray-400" px="6" py="3" bg="ix-black opacity-80")
    HList(font="bold" text="md" color="$mc-finegreen" @click="clickOnMessage" cursor="pointer") {{ message }}
</template>

<script lang="ts" setup>
import type { Popups } from '~/composables/usePopups';

const props = defineProps<{
  popup?: Popups
}>()

const { popupNotification } = usePopups()
const { t } = useI18n()

const message = computed(() => t(`popupNotification.${popupNotification.value}`))

const clickOnMessage = () => {
  switch (props.popup) {
    case 'copy-link':
      return null
    case 'add-to-cart':
      return null
  }
}

</script>
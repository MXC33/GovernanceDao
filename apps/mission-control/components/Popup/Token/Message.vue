<template lang="pug">
HList(items="start" w="full" bg="$mc-accent-20" )
  SenderVideo(:sender="popup.sender" type="square" w="30" cut="bottom-right" pos="sticky top-0")

  VList(h="full" p="x-4 y-3" w="full" space-y="1" max-h="30" overflow-y="auto" scrollbar="~ mc")
    TitleWithIcon(icon="half-circle" fill="$mc-accent-80" font="bold" color="$mc-accent-80" uppercase="~")
      SenderName(:id="popup.sender")

    article(color="white opacity-80") {{ popup.message }}


</template>

<script setup lang="ts">
import type { PopupToken } from '~~/composables/usePopupToken';

defineProps<{
  popup: PopupToken
}>()
</script>

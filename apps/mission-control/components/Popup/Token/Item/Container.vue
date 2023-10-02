<template lang="pug">
div(grid="~ cols-3 gap-1" w="full" text="xs" uppercase="~")
  PopupTokenItemRowContainer(flex-grow="1" grid="col-span-2") 
    slot

  PopupTokenItemRowContainer(v-if="$slots.action" font="bold" cursor="pointer" @click="clickLink")
    div(flex-grow="1")
      slot(name="action")

    ChevronRightIcon(v-if="link" w="2" fill="white")

</template>

<script setup lang="ts">
import ChevronRightIcon from '~/assets/images/ui/icon-chevron-right.svg'
import type { PopupTokenLink } from '~~/composables/usePopupToken';
const { openPopupLink } = usePopupToken()

const clickLink = () => {
  if (props.link)
    openPopupLink(props.link)
}

const props = defineProps<{
  link?: PopupTokenLink
}>()
</script>

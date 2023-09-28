<template lang="pug">
PopupBase()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) {{ $t(`marketplace.unlist.success`) }}

  template(#default)
    CompleteCancelList(:items="items")
      template(#detail="{item}") x{{ item }}

  template(#buttons)
    button(@click="closeActivePopup" btn="~ primary" w="full") {{ $t(`marketplace.offer.continueExploring`) }}

</template>
  
  
<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { UnlistingItem } from '~/composables/useListing'

const { closeActivePopup } = usePopups()

const { items } = defineProps<{
  items: UnlistingItem[]
}>()

defineEmits(["close"])
</script>
  
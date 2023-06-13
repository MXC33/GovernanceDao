<template lang="pug">
Popup()
  template(#icon)
    WarningIcon(w="6" h="6")

  template(#header) Inssufficient funds

  template(#default)
    VList(space-y="6")
      div() You need more IXT to perform this purchase
      IXTSwapIFrame()

  template(#footer)

  template(#buttons)
    HList()
      button(@click="closeActivePopup" btn="~ secondary" w="full") {{ $t('general.close') }}

</template>


<script lang="ts" setup>
import WarningIcon from '~/assets/icons/warning.svg'
const { closeActivePopup } = usePopups()

defineEmits(["close"])
</script>

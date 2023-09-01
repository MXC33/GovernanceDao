<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) Purchase Tickets

  template(#default)
    div() test default

  template(#footer)
    VList()
      button( btn="~ secondary" w="full") {{ $t(`marketplace.offer.viewInActiveList`) }}
      button( btn="~ primary" w="full") {{ $t(`marketplace.offer.continueExploring`) }}

  template(#buttons)
    VList()
      button( btn="~ secondary" w="full") {{ $t(`marketplace.offer.viewInActiveList`) }}
      button( btn="~ primary" w="full") {{ $t(`marketplace.offer.continueExploring`) }}

</template>


<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/arrow-left.svg'
const { closeActivePopup } = usePopups()

defineEmits(["close"])
</script>

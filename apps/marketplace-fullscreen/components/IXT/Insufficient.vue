<template lang="pug">
PopupBase()
  template(#icon)
    WarningIcon(w="6" h="6")

  template(#header) {{ $t('marketplace.ixt.insufficient.title') }}

  template(#default)
    VList(space-y="6")
      div() {{ $t('marketplace.ixt.insufficient.description') }}
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

<template lang="pug">
Popup()
  template(#icon)
    TransferIcon()

  template(#header) {{ $t(`marketplace.list.title`) }}

  template(#default)
    VList(space-y="3")

  template(#footer)

  template(#buttons)
    button(btn="~ primary" disable="on-invalid:active") {{  $t(`general.confirm`) }}

</template>

<script lang="ts" setup>
import type { IXToken, SingleItemData } from "@ix/base/composables/Token/useIXToken"
import type { TransferItem } from '~/composables/useTransfer';
import TransferIcon from '~/assets/icons/transfer.svg'

defineEmits(['close'])

const props = defineProps<{
  item: SingleItemData,
}>()

</script>
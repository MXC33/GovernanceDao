<template lang="pug">
PopupWrapper()
  VList(w="150" h="130" bg="gray-900")

    HList(items="center" justify="between" px="6" py="3" b="b-1 gray-600")
      HList(space-x="2" items="center")
        TransferIcon(w="6")
        span(font="bold" text="xl" uppercase="~") transfer item

      HList()
        CloseIcon(w="4" cursor="pointer" @click.stop="$emit('close')")

    VList(flex-grow="1" px="6" py="3" space-y="2")
      span(color="white" font="bold" text="sm" px="0.5") Transfer to 
      VList(frame="~ gray-400" px="4" py="3") 0x89210247189

    VList(justify="end")
      //- CollectionFilterRowSelect(bg="gray-800 hover:gray-600" px="6" b="t-1 gray-600" space-x="" v-model="isSelected")
      InputCheckbox(v-model="isSelected" bg="gray-800" px="6" py="3" b="t-1 gray-600")
        template(#default)
          span(text="xs" color="white" font="normal" ml="1") I verify, that I am aware and that the wallet address is correct.
      button(w="full" bg="ix-primary on-disabled:gray-700" color="on-disabled:gray-400" py="3" uppercase="~" font="bold" :disabled="!isSelected") transfer

</template>

<script lang="ts" setup>
import TransferIcon from '~/assets/icons/transfer.svg'
import CloseIcon from '~/assets/icons/close.svg'

defineEmits(["close"])

const isSelected = ref(false)

</script>
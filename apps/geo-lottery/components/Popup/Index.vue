<template lang="pug">
Transition(name="fade" appear)
  VList(pos="fixed" inset="0" bg="black opacity-80" w="full" h="full" z="900" items="center" justify="center" @click="onClose" backdrop-blur-sm)

    VList(w="full" pos="relative" @click.stop="" :bg="isError ? 'ix-ne opacity-60' : 'ix-pink opacity-60'" m="auto" z="1000" max-w="150" min-h="415px" color="white" h="lt-md:full" max-h="md:90%" overflow-y="auto" overflow-x="lt-md:hidden" rounded="2xl" b="1 ix-white" )

      HList(v-if="$slots.header || !hideCloseButton" items="center" justify="between" min-h="12" px="4" py="3" b="b-1 ix-white opacity-60" text="md" font="bold" uppercase="~" pos="sticky top-0" z="3")
        HList(space-x="3" items="center")
          HList(space-x="3" items="center" v-if="popup.backModal" cursor="pointer" @click.stop="onClickBack")
            BackIcon(w="5" fill="ix-white opacity-60")
            h3(font="normal" color="ix-white opacity-60") Back

          h3(v-if="$slots.header")
            slot(name="header")

        CloseIcon(w="3" cursor="pointer" @click.stop="onClose" v-if="!hideCloseButton")



      VList(flex-grow="1" v-if="$slots.content")
        slot(name="content")

      VList(flex-grow="1" p="4" space-y="2" v-else)
        slot()

      VList(pos="sticky bottom-0" z="2")
        VList(p="x-4" pb="6" pt="4")
          slot(name="footer")

</template>

<script setup lang="ts">
import CloseIcon from '~/assets/icons/close.svg'
import BackIcon from '~/assets/icons/arrow-left.svg'
const { closeActivePopup, displayPopup, popup } = usePopups()

const onClose = () => {
  if (!disableDefaultClose)
    closeActivePopup()
  emit("close")
}

const { disableDefaultClose, hideCloseButton, isError } = defineProps<{
  hideCloseButton?: boolean,
  disableDefaultClose?: boolean,
  isError?: boolean
}>()

const onClickBack = () => {
  if (popup.value)
    displayPopup({
      type: popup.value.backModal
    })
}

const emit = defineEmits(["close"])
</script>

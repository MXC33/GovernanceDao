<template lang="pug">
Transition(name="fade" appear)
  VList(pos="fixed" inset="0" bg="black opacity-80" w="full" h="full" z="999" items="center" justify="center" @click="onClose")

    VList(w="full" pos="relative" @click.stop="" bg="gray-900" m="auto" z="1000" max-w="150" color="white" h="lt-md:full" max-h="md:90%" overflow-y="auto" overflow-x="lt-md:hidden")

      HList(items="center" justify="between" px="4 md:6" py="3" b="b-1 gray-600" text="lg" font="bold" uppercase="~" pos="sticky top-0" bg="gray-900" z="3")
        HList(space-x="3" items="center")
          div(w="5" v-if="$slots.icon")
            slot(name="icon")

          h3
            slot(name="header")

        CloseIcon(w="4" cursor="pointer" fill="white hover:opacity-80" @click.stop="onClose")

      VList(flex-grow="1" p="4 md:6" space-y="2")
        slot()

      VList(b="t-1 gray-600" pos="sticky bottom-0" bg="gray-900" z="2")
        VList(p="x-6 y-3")
          slot(name="footer")

        slot(name="buttons")
          
</template>

<script setup lang="ts">
import CloseIcon from '~/assets/icons/close.svg'
const { closeActivePopup } = usePopups()

const onClose = () => {
  if (!disableDefaultClose)
    closeActivePopup()
  emit("close")
}

const { disableDefaultClose } = defineProps<{
  disableDefaultClose?: boolean
}>()

const emit = defineEmits(["close"])
</script>
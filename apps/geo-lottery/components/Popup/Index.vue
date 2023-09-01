<template lang="pug">
Transition(name="fade" appear)
  VList(pos="fixed" inset="0" bg="black opacity-80" w="full" h="full" z="999" items="center" justify="center" @click="onClose" backdrop-blur-sm)

    VList(w="full" pos="relative" @click.stop="" bg="ix-pink opacity-60" m="auto" z="1000" max-w="150" color="white" h="lt-md:full" max-h="md:90%" overflow-y="auto" overflow-x="lt-md:hidden" rounded="2xl" b="1 ix-white" )

      HList(items="center" justify="between" px="4 " py="3" b="b-1 ix-white opacity-60" text="md" font="bold" uppercase="~" pos="sticky top-0" z="3")
        HList(space-x="3" items="center")
          div(w="5" v-if="$slots.icon")
            slot(name="icon")

          h3(v-if="$slots.header")
            slot(name="header")

        CloseIcon(w="3" cursor="pointer" @click.stop="onClose")

      VList(flex-grow="1" p="4" space-y="2")
        slot()

      VList(pos="sticky bottom-0" z="2")
        VList(p="x-4 y-2")
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

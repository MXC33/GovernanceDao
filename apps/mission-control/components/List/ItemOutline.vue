<template lang="pug">
ButtonSound(sound="md" text="left xs" w="full" :disable="isDisabled" )
  HList(listitem="~ s-accent:accent on-selected:selected" items="stretch" :selected="isSelected" :state="state" h="18 on-large:26" :large="isLarge" group)

    VList(aspect="square" pos="relative" h="full" v-if="$slots.carousel")
      slot(name="carousel")

    VList(aspect="square" pos="relative" h="full" v-if="$slots.iconLeft")
      VList(pos="absolute" inset="0" p="l-1px t-1px b-1px" justify="center" items="center" align="center")
        slot(name="iconLeft")

    HList(bg="(gray-400 opacity-80) on-selected:(!opacity-20) group-hover:(!opacity-20)" :selected="isSelected" flex-grow="1" transition="all" overflow="hidden")

      VList(listitem="~ s-selected:selected s-accent:accented" b="!0 !l-1" :active="isSelected" :state="state" p="4" justify="center" flex-grow="1" space-y="0.5" uppercase="~" w="full")
        slot(name="default")

      slot(name="reserveRight")

      ChevronRightIcon(size="4" mr="4" fill="white s-accent:$corporation-text-color on-selected:$mc-accent group-hover:$listitem-select-color" v-if="!$slots.rightSlot" :selected="isSelected" self="center" :state="state" transition="all")
      VList(py="2" justify="end" self="center" v-else)
        slot(name="rightSlot")

  slot(name="afterItem")
  
</template>
  
<script setup lang="ts">
import ChevronRightIcon from '~/assets/images/ui/icon-chevron-right.svg'

const props = defineProps<{
  isSolid?: boolean,
  isActive?: boolean,
  accented?: boolean,
  isSelected?: boolean,
  isDisabled?: boolean,
  isLarge?: boolean,
}>()

const state = computed(() => {
  if (props.accented)
    return 'accent'
})
</script>
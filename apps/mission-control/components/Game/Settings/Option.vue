<template lang="pug">
ButtonSound(bg="s-selected:mc-mint_20 hover:mc-mint_10" color="white s-selected:mc-mint hover:mc-mint" cursor="pointer" w="full" sound="sm" :state="isSelected" @click="handleSetGraphicState(quality)" group)
  HList(justify="between")
    span() {{ title }}

    Transition(name="fade-slow" mode="in-out")
      CheckIcon(v-if="isSelected" w="4" stroke="mc-mint")

  
</template>
  
<script setup lang="ts">
import CheckIcon from '~~/assets/images/ui/icons/checkmark.svg?component'
import { useLocalStorage } from '~~/composables/useLocalStorage'

const { gameQuality, setGraphicState } = useGameInterface()
const { saveData } = useLocalStorage('gameQuality', 2)

const { quality, title } = defineProps<{
  quality: number
  title: string
}>()

const handleSetGraphicState = (quality: number) => {
  setGraphicState(quality)
  saveData(quality)
}

const emit = defineEmits(['close-menu'])

const backToSettings = () => {
  emit('close-menu')
}

const isSelected = computed(() => {
  if (gameQuality.value == quality)
    return 'selected'
  return ''
})

</script>
  

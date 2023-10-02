<template lang="pug">
CorporationColorSpace(:corporation="corporation")
  ListItemOutline(@click="selectCorporation" :accented="true")
    template(#iconLeft)
      CorporationImage(:corporation="corporation" :filled="true" max-h="8" max-w="60%")

    template(#default)
      TitleWithIcon(icon="half-circle" fill="$mc-accent")
        CorporationName(:corporation="corporation" color="$mc-accent")

      VList()
        div ONGOING TASK: {{ totalOrderCount - claimableOrderCount }}
        div COMPLETED TASK: {{ claimableOrderCount }}

</template>

<script setup lang="ts">
import type { Corporation } from '~~/composables/corporations/useCorporations';
const { selectedCorporation, completedTasksAndOrders, totalTasksAndOrders } = useTaskManager()
const currentTime = useTimestamp({ interval: 1000 })

const selectCorporation = () => {
  selectedCorporation.value = props.corporation
}
const totalOrderCount = computed(() => totalTasksAndOrders(props.corporation))
const claimableOrderCount = computed(() => completedTasksAndOrders(props.corporation, currentTime.value))

const props = defineProps<{
  corporation: Corporation
}>()
</script>
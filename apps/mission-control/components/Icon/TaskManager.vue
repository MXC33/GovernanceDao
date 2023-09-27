<template lang="pug">
img(:src="icon")
</template>

<script lang="ts" setup>
  import NewLands from '~/assets/images/ui/task_manager/header_new_lands.png'
  import GlobalWaste from '~/assets/images/ui/task_manager/header_global_waste_system.png'
  import Y from '~/assets/images/ui/task_manager/header_y.png'
  import EternaLab from '~/assets/images/ui/task_manager/header_eterna_lab.png'

  const icon = computed(() => {
    switch (props.icon) {
      case 'nl': return NewLands
      case 'gws': return GlobalWaste
      case 'y': return Y
      case 'el': return EternaLab
    }
  })

  const props = defineProps<{
    icon: string
  }>()

</script>
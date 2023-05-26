<template lang="pug">
div()
  HList(group p="3")
    TrashIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange")
    VList( )
      div(color="white group-hover:$mc-orange" text="16px" ) {{title}} 
      div(color="gray-200 group-hover:$mc-orange" ) {{ description }}
</template>

<script lang="ts" setup>
import TrashIcon from '~/assets/icons/trash.svg'

const props = defineProps<{
  title: string,
  description: string,
}>()

</script>
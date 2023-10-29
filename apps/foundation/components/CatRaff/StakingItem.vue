<template lang="pug">
Card()
  CardTitle() 
    template(#default) {{ $t(`ixtCatRaff.${id}.title`) }}
    template(#detail) {{ $t(`ixtCatRaff.${id}.description`) }}




</template>
    
<script lang="ts" setup>

const { id } = defineProps<{
  id: string
}>()

</script>
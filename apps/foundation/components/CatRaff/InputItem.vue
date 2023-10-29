<template lang="pug">
Card()
  HList()
    CardTitle() 
      template(#default) {{ $t(`ixtCatRaff.${id}.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.${id}.description`) }}
    HList(space-x="6")
      div() Available 
      div() ixt
  HList()
    input()
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" text="button")
</template>
    
<script lang="ts" setup>


const { id } = defineProps<{
  id: string
}>()

</script>
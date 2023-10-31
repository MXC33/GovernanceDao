<template lang="pug">
Card()
  HList()
    CardTitle(flex-grow space-y="2") 
      template(#default) {{ $t(`ixtCatRaff.${id}.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.${id}.description`) }}
    HList(space-x="1")
      div() Available:
      TitleDetail(:icon="id === 'stake' ? 'ixt' : 'ixt'")
      div() 0.00
  HList(space-x="2")
    input(type="text" text="bold" :placeholder="id === 'stake' ? 'IXT' : 'TICKETS'" ref="searchElement" bg="gray-900 md:ix-black"  outline="none" px="2" w="full" size="3")
    ButtonGlitch(btn="~ primary-outline-cut" :text="id === 'stake' ? 'STAKE IXT' : 'ADD TICKETS'")
</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id: string;
}>();
</script>

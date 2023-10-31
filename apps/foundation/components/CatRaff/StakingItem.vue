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

  HList()
    CardDetail(flex-grow)
      HList(class="items-center space-x-2" justify="between")
        VList()
          CardTitle() 
            template(#detail) {{ $t(`ixtCatRaff.depositAmount.description`) }}
          div(flex) 0.00
            TitleDetail(:icon="id === 'stake' ? 'ixt' : 'ixt'")
        ButtonGlitch(btn="~ primary-outline-cut" :text="id === 'withdraw' ? 'withdraw' : 'Claim'")
</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id: string;
}>();
</script>

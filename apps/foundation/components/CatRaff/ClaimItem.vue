<template lang="pug">
Card()
  HList()
    CardTitle(flex-grow space-y="2") 
      template(#default) {{ $t(`ixtCatRaff.claim.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.claim.description`) }}
    HList(space-x="1")
      slot(name="detail")

  HList(w="full")
    CardTitle() 
      template(#detail) {{ $t(`ixtCatRaff.depositAmount.description`) }}
    HList(w="full" justify="between")
      HList()
        slot(name="box")
      ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'Claim'")
</template>

<script lang="ts" setup>
const { withdrawIXT, claimPrize } = useCatRaffStakingContract()

const onClick = () => {
  return claimPrize()
}
</script>

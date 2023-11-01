<template lang="pug">
Card()
  HList()
    CardTitle(flex-grow space-y="2") 
      template(#default) {{ $t(`ixtCatRaff.claim.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.claim.description`) }}
    HList(space-x="1")
      slot(name="detail")

  HList()
    CardDetail(flex-grow)
      HList(class="items-center space-x-2" justify="between")
        VList()
          CardTitle() 
            template(#detail) {{ $t(`ixtCatRaff.depositAmount.description`) }}
          HList()
            slot(name="box" flex-grow)
        ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'Claim'")
</template>

<script lang="ts" setup>
const { withdrawIXT, claimPrize } = useCatRaffStakingContract()

const onClick = () => {
  return claimPrize()
}
</script>

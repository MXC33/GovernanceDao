<template lang="pug">
PageSection(section="staking" :primary="true")
  Card()
    VList()
      TitleDetail()
        h3() Energy Pool: 400 000 IXT / month
        h4(color="") Epoch ends in 21D 6H 0M
          TitleDetail()
            template(#detail)
              ul() 
                li() Daily IXT per Energy
                li() TVL 
                li() IXT unlocked this epoch
                li() Your Stake 
                li() Claimable rewards
            ul() 
              li() 0
              li() 0 
              li() 0
              li() 0
              li() 0
    button(btn="~ primary-outline") CHOOSE STAKING POOL

</template>

<script lang="ts" setup>

</script>
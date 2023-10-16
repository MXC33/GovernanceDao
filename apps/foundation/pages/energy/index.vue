<template lang="pug">
Page()
  HList(grid="~ cols-2")
    VList(space-x-6)
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

    VList(grid="~" space-y="12" flex-direction-row) 
      CardChart()
      HList(gap="6")
        Card() 
          TitleDetail()
            h3() IXT Pool next epoch
            h4(color="orange") Estimated
            TitleDetail(#detail)
              h4(text="xl") Total pool next epoch 
            h4() 422,681
              IXTIcon(w="6")
        Card()
          TitleDetail()
            h3() Next epoch release
            h4(color="orange") Based on facilities minted
            TitleDetail(#detail)
              h4(text="xl") 99.94%
            h4() 422,431.531
              IXTIcon(w="6")

  PageSection(section="pool")
  HList(grid="~ gap-6")
    Card(w="fit")
      div(class="imgBox" w="stretch" bg="black" p=6)
        IXTIcon(w="25")
      TitleDetail()
        PageSection(section="pool.options.earnIXT")

    Card(w="fit")
      div(class="imgBox" w="stretch" bg="black" p=6)
        IXTIcon(w="25" class="ml-2")
      TitleDetail()
        PageSection(section="pool.options.earnAndGive")


  PageSection(section="forIxt")
    StakeEnergy()
  PageSection(section="ameliaFoundation")
    Card() MASSA INFO
</template>

<script lang="ts" setup>
import IXTIcon from '../../public/assets/svg/token.svg'

</script>

<style>
.imgBox {
  flex: display;
  align-items: center;
}
</style>
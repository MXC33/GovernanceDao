<template lang="pug">
Page()
  HList(grid="~ cols-2" gap="20")
    VList(space-x-6)
      PageSection(section="pool" :primary="true")
        Card(w="xl")
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
          MetashareClaimHorizontal()

    VList(grid="~" space-y="12" flex-direction-row) 
      CardChart(w="xl")
      HList(gap="6")
        Card(w="xs") 
          TitleDetail()
            h3() IXT Pool next epoch
            h4(color="orange") Estimated
            TitleDetail(#detail)
              h4(text="xl") Total pool next epoch 
            h4() 422,681
              IXTIcon(w="6")
        Card(w="xs")
          TitleDetail()
            h3() Next epoch release
            h4(color="orange") Based on facilities minted
            TitleDetail(#detail)
              h4(text="xl") 99.94%
            h4() 422,431.531
              IXTIcon(w="6")

  PageSection(section="earnStaking")
  HList(grid="~ gap-6" b="red solid 1px")
    Card(w="fit" b="blue solid 1px")
      TitleDetail()
        PageSection(section="ixtStakingInfo")
        IXTIcon(w="25" class="ml-2" b="blue solid 1px")
    Card(w="fit" rounded="br tr")
      TitleDetail()
        PageSection(section="lpStakingInfo")
    Card(bg="black" rounded="br tr" flex-grow)
      IXTIcon(w="25" class="ml-2")

  PageSection(section="something")
    Stake()
  PageSection(section="amelia")
    Stake()
</template>

<script lang="ts" setup>
import IXTIcon from '../../public/assets/svg/token.svg'

</script>
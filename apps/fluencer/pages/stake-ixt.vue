<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/ixt-cover.png")
      template(#title) IXT
      template(#description) Staking IXT provides holders dual benefits: you earn an annual percentage yield (APY) while enhancing the security and efficiency of the blockchain network. By staking, holders actively participate in the network's consensus mechanism, aiding in transaction validation. Essentially, staking offers financial incentives while promoting a more robust and inclusive blockchain ecosystem. 

  template(#default)
    PageTabs()

    StakeIxt()

    StakeIxtUserStaked()


</template>


<script lang="ts" setup>


</script>
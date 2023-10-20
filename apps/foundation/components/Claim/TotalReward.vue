<template lang="pug">
Card(style="padding: 10px; border-radius: 8px;")
  HList(flex flex-row justify-between space-x="10")
    TitleDetail()
      template(#detail)
        PageParagraphs(:section="currentSectionTotalRewards")
      p [Api Data]
    button(btn="~ secondary" disable="active")
      PageParagraphs(:section="currentSectionClaim")
  </template>
  
<script>
export default {
  computed: {
    currentRoute() {
      return this.$route.name; // Assuming you have named routes
    },
    currentSectionTotalRewards() {
      if (this.currentRoute === 'territories') {
        return 'StakingTotalRewards';
      } else if (this.currentRoute === 'landmarks') {
        return 'TotalRewards';
      }
    },
    currentSectionClaim() {
      if (this.currentRoute === 'territories') {
        return 'StakingClaim';
      } else if (this.currentRoute === 'landmarks') {
        return 'ClaimButton';
      }
    }
  }
}
</script>
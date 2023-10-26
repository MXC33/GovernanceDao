<template lang="pug">
Card(style="padding: 10px; border-radius: 8px;")
  HList(grid="~ cols-2")
    TitleDetail()
      template(#detail)
        div(style="display: flex; justify-content: space-between;" space-x="10")
          PageParagraphs(:section="currentSectionDay")
          PageParagraphs(:section="currentSectionWeek")
      div(style="display:flex; justify-content: space-between;")
        p  {{ }}
        p [Api Data]
  </template>
  
<script>




export default {
  computed: {
    currentRoute() {
      return this.$route.name; // Assuming you have named routes
    },
    currentSectionDay() {
      if (this.currentRoute === 'territories') {
        return 'StakingEarningsDay';
      } else if (this.currentRoute === 'landmarks') {
        return 'EarningsPerDay';
      }
    },
    currentSectionWeek() {
      if (this.currentRoute === 'territories') {
        return 'StakingEarningsWeek';
      } else if (this.currentRoute === 'landmarks') {
        return 'Earnings7Days';
      }
    }
  }
}
</script>
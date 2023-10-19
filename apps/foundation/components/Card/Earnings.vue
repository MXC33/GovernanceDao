<template lang="pug">
Card(style="padding: 10px; border-radius: 8px;")
  HList(grid="~ cols-2")
    TitleDetail()
      template(#detail)
        div(style="display: flex; justify-content: space-between;" space-x="10")
          PageParagraphs(section="StakingEarningsPerDay")
          PageParagraphs(section="StakingEarnings7Days")
      div(style="display:flex; justify-content: space-between;")
        p [Api Data]
        p [Api Data]
  </template>
  
<script>


</script>
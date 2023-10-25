<template lang="pug">
CardSection(title="Staking")
  HList(space-x="3")
    TitleDetail(v-for="listItem, index in lists" :key="index")
      template(#detail) {{ listItem.title }}
      template(#default) {{ listItem.items }}
  template(#buttons)
    div(grid="~ cols-2" space-x="3")
      button(btn="~ primary-outline-cut" disable="active") STAKE
      button(btn="~ primary-outline-cut" disable="active") WITHDRAW
</template>
<script lang="ts" setup>


interface ListItem {
  title: string,
  items: string
}

const lists: ListItem[] = [{
  title: "Shares owned",
  items: "[Dyn Value]" // <-- ERSÄTT MED API DATA
},
{
  title: "Shares staked",
  items: "[Dyn Value]"
},
{
  title: "Daily yield",
  items: "[Dyn Value]"
},
{
  title: "TVL",
  items: "[Dyn Value]"
}
]

</script>
<template lang="pug">
CardSection(title="Staking")
  HList(space-x="3")
    TitleDetail(v-for="listItem, index in lists" :key="index")
      template(#detail) {{ listItem.title }}
      template(#default) {{ listItem.items }}
  template(#buttons)
    div(grid="~ cols-2" space-x="3")
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('metashare.depositButton')")
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('metashare.withdrawButton')")

</template>
<script lang="ts" setup>


interface ListItem {
  title: string,
  items: string
}

const lists: ListItem[] = [{
  title: "Shares owned",
  items: "0" // <-- ERSÄTT MED API DATA
},
{
  title: "Shares staked",
  items: "0"
},
{
  title: "Daily yield",
  items: "0"
},
{
  title: "TVL",
  items: "0"
}
]

</script>
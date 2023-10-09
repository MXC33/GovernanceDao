<template lang="pug">
HList()
  ul(v-for="listItem, index in lists" :key="index" p=6)
    li(text="xs") {{ listItem.title }}
    li(text="xs") {{ listItem.items }}
button(btn="secondary") STAKE
button(btn="secondary") WITHDRAW

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
<template lang="pug">
HList()
  ul(v-for="listItem, index in lists" :key="index")
    li {{listItem.title}}
    li {{ listItem.items }}

</template>


<script lang="ts" setup>


interface ListItem {
  title: string,
  items: number
}

const lists: ListItem[] = [{
  title: "Shares owned",
  items: 1 // <-- ERSÄTT MED API DATA
},
{
  title: "Shares staked",
  items: 2.5
},
{
  title: "Daily yield",
  items: 5
},
{
  title: "TVL",
  items: 10
}
]

</script>
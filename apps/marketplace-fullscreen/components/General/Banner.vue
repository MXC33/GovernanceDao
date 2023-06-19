<template lang="pug">
div.general_banner_wrapper(v-if="items.length")
  div.general_banner.general_banner_large
    a(:target="firstItem.new_tab ? '_blank' : '_self'" :href="firstItem.link")
      img(:src="firstItem.image")
  div.general_banner_items(v-if="otherItems.length")
    div.general_banner(v-for="(item, index) in otherItems")
      a(:target="item.new_tab ? '_blank' : '_self'" :href="item.link" :key="'general_banner_'+index")
        img(:src="item.image")
</template>

<script lang="ts" setup>
const {items} = defineProps<{
  items: any[]
}>()

const firstItem = computed(() => {
  if (!items.length) return null
  return items[0]
})

const otherItems = computed(() => {
  if (items.length < 2) return []
  return items.splice(1)
})
</script>

<style scoped>
.general_banner_wrapper {
  background: #0c0c0c;
  padding: 16px;
  gap: 16px;
}
.general_banner_wrapper .general_banner_items {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.general_banner_wrapper .general_banner {
  flex-grow: 1;
}
.general_banner_wrapper .general_banner a {
  display: block !important;
  text-decoration: none !important;
  margin: 0 !important;
}
.general_banner_wrapper .general_banner img {
  display: block !important;
  width: 100% !important;
  height: auto !important;
}

</style>

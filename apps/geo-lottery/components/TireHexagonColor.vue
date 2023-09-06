<template lang="pug">
HList(items="center")
  div(v-for="(item, index) in itemsTiers" )
    <svg max-w="100%" h="auto"  width="64" viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path v-if="item.title.toLowerCase() == tier.toLowerCase()" d="M36.75 3.01036C33.8107 1.31335 30.1893 1.31335 27.25 3.01036L7.53719 14.3916C4.59788 16.0886 2.78719 19.2248 2.78719 22.6188V45.3812C2.78719 48.7752 4.59788 51.9114 7.53719 53.6084L27.25 64.9896C30.1893 66.6866 33.8107 66.6867 36.75 64.9896L56.4628 53.6084C59.4021 51.9114 61.2128 48.7752 61.2128 45.3812V22.6188C61.2128 19.2248 59.4021 16.0886 56.4628 14.3916L36.75 3.01036Z" :stroke="activeItemsTiers" stroke-width="3" stroke-linejoin="round"/>
      <path d="M28 8.3094C30.4752 6.88034 33.5248 6.88034 36 8.3094L52.2487 17.6906C54.7239 19.1197 56.2487 21.7607 56.2487 24.6188V43.3812C56.2487 46.2393 54.7239 48.8803 52.2487 50.3094L36 59.6906C33.5248 61.1197 30.4752 61.1197 28 59.6906L11.7513 50.3094C9.27608 48.8803 7.75129 46.2393 7.75129 43.3812V24.6188C7.75129 21.7607 9.27608 19.1197 11.7513 17.6906L28 8.3094Z" :fill="item.color"/>
    </svg>
</template>
<script lang="ts" setup>

const itemsTiers = [
  {
    title: 'Outlier',
    color: '#FFFFFF'
  },
  {
    title: 'Common',
    color: '#009436'
  },
  {
    title: 'Uncommon',
    color: '#4057F8'
  },
  {
    title: 'Rare',
    color: '#A54BBC'
  },
  {
    title: 'Legendary',
    color: '#FFAB00'
  }
]
const activeItemsTiers = "#FF1E6E"

const { tier } = defineProps<{
  tier?: string,
}>()
</script>
<style>
</style>

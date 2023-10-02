<template lang="pug">
fieldset(border="1 mc-orange_60" mt="1 lg:5" p="x-4 y-4" w="full")
  legend(uppercase="~" text="xs mc-orange" p-x="2") {{$t(`cosmetics.userInfo.showcase`)}}
  div(flex="~ col")
    div(flex="~ row grow" mb="2 lg:6")
      div(v-for="title in showCaseTitles")
        button(@click="activeTab = title" btn="~ accent" p="x-8 y-1 lg:x-15 lg:y-2" ml="2" uppercase="~" text="xs") {{ title }}

    UserShowcaseNFTs(v-if="activeTab == 'nfts'")
    UserShowcaseCosmetics(v-if="activeTab == 'cosmetics'")
    UserShowcaseStatistics(v-if="activeTab == 'statistics'")
    UserShowcaseAchivements(v-if="activeTab == 'achivements'")
</template>

<script setup>
const activeTab = ref('nfts')
const showCaseTitles = ['nfts', 'cosmetics', 'statistics']
// const showCaseTitles = ['nfts', 'cosmetics', 'statistics', 'achivements', 'backpack']
</script>

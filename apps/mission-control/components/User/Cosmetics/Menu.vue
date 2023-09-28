<template lang="pug">
div(space-y="5")
  TitleWithPointer(text="base lg:lg") {{$t(`cosmetics.chooseCosmetics`)}}

  div(flex="~ row lg:wrap'" overflow-x="lt-lg:scroll" justify="between" space-x="10 lg:2" text="xs mc-orange left")
    div(v-for="title in showCaseTitles" flex="~ col" space-y="1")
      div(w="50" h="54" ring="1 mc-orange_20")
      div(w="50" bg="mc-orange_10" p="1" ring="1 mc-orange_20" ) {{ title }}
</template>

<script setup lang="ts">
const showCaseTitles = ['avatar', 'profile_background', 'mc_background', 'nft1', 'nft2', 'nft3']
</script>
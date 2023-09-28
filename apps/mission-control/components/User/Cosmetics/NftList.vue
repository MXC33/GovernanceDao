<template lang="pug">
div(flex="~ col" border="1 mc-orange_40" bg="mc-orange_10" mt="10")
  div(flex="~ col" border="b-1 mc-orange_40" p="5" space-y="1")
    TitleWithPointer {{$t(`cosmetics.chooseNFT`)}}
    img(:src="DecoraTitle" w="20")

  div(flex="~ col" border="b-1 mc-orange_40" p="5")
    //ButtonFilter

  div(flex="~ col" border="b-1 mc-orange_40" p="5")
    div(flex="~ row" space-x="2")
      img(:src="SearchIcon" h="5")
      input(w="full" text="sm mc-orange" capitalize="~" placeholder="search" placeholder-color="mc-orange_40" bg="mc-orange opacity-0" outline="none")

  div(flex="~ col" p="4"  space-y="2")
    div(v-if="!searchValue" v-for="nft in list")
      //- UserCosmeticsNFTItem(:tier="nft.tier" :type="nft.type" :id="nft.id")
    div(v-else-if="searchValue && filterList.length !== 0" v-for="nft in filterList")
      //- UserCosmeticsNFTItem(:tier="nft.tier" :type="nft.type" :id="nft.id")
    div(v-else-if="searchValue && filterList.length == 0")
      p(text="white") No results found!
</template>

<script setup lang="ts">
import SearchIcon from '~/assets/images/ui/icon-search.png'
import DecoraTitle from '~/assets/images/ui/user/cosmetics/decora-title.png'

const { nfts } = useUserData()

const searchValue = ref()
const filterList = ref()

const list = computed((type) => nfts.value.filter(item => item.type == 'drone'))

</script>

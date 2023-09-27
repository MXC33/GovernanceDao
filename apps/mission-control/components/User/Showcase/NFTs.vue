<template lang="pug">
div(grid="~ cols-5 gap-3")

  div(v-for="(nft, index) in showcaseNFT" flex="~ col" space-y="2")

    div(flex="~ row" justify="between" items="center" bg="mc-orange_10" border="1 mc-orange_20" p="1")

      div(flex="~ col" align="left")
        p(text="xs white opacity-80") {{$t(`cosmetics.userInfo.showcase`)}} {{ index + 1 }}
        p(text="sm mc-orange") {{ nft.tier }} {{ nft.type }}

      EditIcon(w="4")
</template>

<script setup lang="ts">
import EditIcon from '~/assets/images/ui/user/icon_edit.svg'

const { nfts } = useUserData()
const showcaseNFT = computed(() => nfts.value.slice(0, 5))
</script>

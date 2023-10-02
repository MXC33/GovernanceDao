<template lang="pug">
VList(pos="sticky bottom-0" color="white" bg="mc-black opacity-90" v-if="canClaim")
  button(btn="~ secondary-outline uppercase" @click="clickOpenAvatars" w="full") Claim Avatar
</template> 

<script setup lang="ts">
const { claimAvatarPack } = useGenericBurnPixAssetsContract()
const { execute: fetchClaimStatus, data: canClaim } = useCanClaimAvatarData()
onMounted(() => {
  fetchClaimStatus()
})

const clickOpenAvatars = () => {
  claimAvatarPack()
}

</script>
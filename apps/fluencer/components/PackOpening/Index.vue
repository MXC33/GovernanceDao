<template lang="pug">
ListItem(overflow-x="hidden")
  template(#image)
    TokenImage(:token="token")
  template(#title) {{ token?.tokenInfo?.title }}
  template(#description)
    p Balance: 1 
    //{{ token?.balance }}

  template(#button)
    ButtonInteractive(@click="claimRewardRequest(token)"  v-if="token" text="Open" cut="md:~ bottom-right sm b-ix-primary" :loading="isLoading"  :loading-text="'Opening pack...'") 

</template>
    
<script lang="ts" setup>


import type { NftFragment } from '.nuxt/gql/default';
const { token } = defineProps<{
  token: NftFragment
}>()

const { openPack } = useOpenPacks()
const { loading: isLoading, execute: claimRewardRequest } = useContractRequest(async (token: NftFragment) => {
  return onClickOpen(token)
})


const onClickOpen = async (token: NftFragment) => {
  await openPack(token)
}
</script>
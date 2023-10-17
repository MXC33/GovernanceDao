<template lang="pug">
ListItem()
  template(#image)
    TokenImage(:token="token")
  template(#title) {{ token?.tokenInfo?.title }}
  template(#description)
    p Balance: {{ token?.balance }}

  template(#button)
    ButtonInteractive(@click="claimRewardRequest(token)"  v-if="token" text="Open" min-w="55" cut="~ bottom-right sm" :loading="isLoading"  :loading-text="'Opening pack...'") 
</template>
    
<script lang="ts" setup>


import type { NftFragment } from '.nuxt/gql/default';

const { token } = defineProps<{
  token: NftFragment
}>()

const { displaySnack } = useSnackNotifications()
const { openPack } = useOpenPacks()
const { loading: isLoading, execute: claimRewardRequest } = useContractRequest(async (token: NftFragment) => {
  return onClickOpen(token)
})

const onClickOpen = async (token: NftFragment) => {
  const packOpened = await openPack(token)
  if (packOpened)
    displaySnack("open-success", "success")
}
</script>
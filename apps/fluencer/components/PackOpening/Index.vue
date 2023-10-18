<template lang="pug">
ListItem()
  template(#image)
    TokenImage(:token="token")
  template(#title) {{ token?.tokenInfo?.title }}
  template(#description)
    p Balance: 1 
    //{{ token?.balance }}

  template(#button)
    ButtonInteractive(@click="claimRewardRequest(token)"  v-if="token" text="Open" cut="md:~ bottom-right sm" :loading="isLoading"  :loading-text="'Opening pack...'") 

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

const openedItems = usePackContent()

const useGGPackContent = (type: string, tier: string) => useAsyncData(`gg-pack-content-${type}-${tier}`, () =>
  GqlGGPackContent({ token: { type, tier } })
)

const { execute: fetchPackContent, data: ggContent } = useGGPackContent(token.tokenInfo?.type ?? "", token.tokenInfo?.tier ?? "")

const onDidOpen = async () => {
  await fetchPackContent()
  const items = ggContent.value?.gravityGradePackContent?.map((item) => item?.token as NftFragment).filter(Boolean) as NftFragment[]
  console.log("Yo", items)
  openedItems.value = items
}

const onClickOpen = async (token: NftFragment) => {
  const packOpened = await openPack(token)

  if (packOpened)
    await onDidOpen()
}
</script>
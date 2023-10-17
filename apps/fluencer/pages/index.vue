<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/bundle-cover.png")
      template(#title) CONGRATULATIONS ON YOUR PURCHASE
      template(#description) In order for you to start yielding rewards, you need to stake your purchased assets at IX Foundation. Open your bundle by clicking “Open bundle” and confirming in your wallet provider. Once your assets are unpacked stake them one at a time at their individual tab.

  template(#default)
    PageTabs()

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900")
      template(#header)
        div My bundles

      template(#default)
        DrawerContentBody()
          ListItem(v-for="token in vouchers" v-if="vouchers")
            template(#image)
              TokenImage(:token="token")
            template(#title) {{ token?.tokenInfo?.title }}
            template(#description)
              p Balance: {{ token?.balance }}

            template(#button)
              ButtonInteractive(@click="onClickOpen(token)"  v-if="token" text="Open" min-w="35" cut="~ bottom-right sm" :loading="isLoading") 

    
</template>



<script lang="ts" setup>
import type { NftFragment } from '.nuxt/gql/default';

const { displaySnack } = useSnackNotifications()
const { data: vouchers } = useVoucherData()
const { openPack } = useOpenPacks()
const { loading: isLoading, execute: claimRewardRequest } = useContractRequest(async (token: NftFragment) => {
  const response = await openPack(token, 1)
  console.log("Got it", response)
  displaySnack("stake-success", "success")
})

const onClickOpen = (token: NftFragment) => {
  return claimRewardRequest(token)
}

</script>
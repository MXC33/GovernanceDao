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
              button(btn="~ primary" @click="onClickOpen(token)" cut="~ bottom-right sm" v-if="token") Open

    
</template>



<script lang="ts" setup>
import type { NftFragment } from '.nuxt/gql/default';


const { data: vouchers } = useVoucherData()
const { openPack } = useOpenPacks()

const onClickOpen = (token: NftFragment) => {
  return openPack(token, 1)
}

</script>
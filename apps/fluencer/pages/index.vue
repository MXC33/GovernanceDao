<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/bundle-cover.png")
      template(#title) CONGRATULATIONS ON YOUR PURCHASE
      template(#description) In order for you to start yielding rewards, you need to stake your purchased assets at IX Foundation. Open your bundle by clicking “Open bundle” and confirming in your wallet provider. Once your assets are unpacked stake them one at a time at their individual tab.

  template(#default)
    PageTabs()

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900" max-h="auto")
      template(#header)
        div My bundles

      template(#default)
        DrawerContentBody()
          ListLoading(v-if="vouchersPending")
          template(v-for="token in tokens" v-else-if="tokens && tokens.length > 0")
            PackOpening(v-for="i in token.balance"  :token="token")
          div(v-else text="detail") You don't own any packs 

PackOpeningComplete()
</template>



<script lang="ts" setup>
const { data: tokens, pending: vouchersPending } = useVoucherData()
</script>
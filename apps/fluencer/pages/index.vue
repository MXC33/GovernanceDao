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
          PackOpening(v-for="token in tokens" v-if="tokens" :token="token")

    
</template>



<script lang="ts" setup>

const { data: tokens } = useVoucherData()


</script>
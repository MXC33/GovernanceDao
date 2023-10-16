<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/bundle-cover.png")
      template(#title) HISTORY
      template(#description) Within Planet IX, Metashares work like any other form of corporate ownership. By staking your shares you ‘activate’ them and directly start to earn rewards from your shares. Without staking your shares you simply hold them in your wallet, without yielding rewards.

  template(#default)
    PageTabs()

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900")
      template(#header)
        div My bundles

      template(#default)
        DrawerContentBody()
          ListItem()
            template(#image)
              img(src="~/assets/images/bundle-cover.png")
            template(#title) Planet Bundle Large
            template(#description)
              p Date of purchase: 07102023
              p Date of purchase: 07102023


    
</template>


<script lang="ts" setup>
</script>
<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/ixt-cover.png")
      template(#title) IXT
      template(#description) Within Planet IX, Metashares work like any other form of corporate ownership. By staking your shares you ‘activate’ them and directly start to earn rewards from your shares. Without staking your shares you simply hold them in your wallet, without yielding rewards.

  template(#default)
    PageTabs()

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900")
      template(#header)
        div Stake your IXT

      template(#default)
        DrawerContentBody(space-y="6")
          ListItem()
            template(#image)
              img(src="~/assets/images/ixt-coin.png")
            template(#title)
              span(color="gray-200" text="md") My balance

            template(#description)
              VList(text="lg")
                div(color="white" font="bold") 
                  span {{ixtBalanceRounded}} IXT 
                  span(font="400" color="gray-200") ${{usdBalanceRounded}}

          Divider(mx="-6")

          VList()
            PageSubTitle() Duration
            div(grid="~ cols-4 gap-3")
              button(btn="~ form on-active:form-active" v-for="monthCount in months" capitalize="~" :active="activeMonth == monthCount" @click="selectDays(dayCount)") {{ formattedDays(dayCount) }}

          Divider(mx="-6")

          PageSubTitle() Projected Total


    
    
</template>


<script lang="ts" setup>
const months = [1, 3, 6, 12]
const activeMonth = ref(1)
const selectMonth = (active: number) => {

}

const { ixtToUSD } = useCurrencyConversion()
const { ixtBalance } = useCurrencyData()
const ixtBalanceRounded = computed(() => roundToDecimals(ixtBalance.value ?? 0, 2))
const usdBalanceRounded = computed(() => roundToDecimals(ixtToUSD(ixtBalance.value ?? 0), 2))

</script>
<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/metashare-cover.png")
      template(#title) METASHARES
      template(#description) Within Planet IX, Metashares work like any other form of corporate ownership. By staking your shares you ‘activate’ them and directly start to earn rewards from your shares. Without staking your shares you simply hold them in your wallet, without yielding rewards.

  template(#default)
    PageTabs()

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900")
      template(#header)
        div My Metashares

      template(#default)
        DrawerContentBody()
          ListItem(v-for="token in metashares" v-if="metashares")
            template(#image)
              TokenMedia(:token="token")
            template(#title) {{ token?.tokenInfo?.title }}
            template(#description)
              p Balance: {{ token?.balance }}
            template(#button)
              ButtonInteractive(@click="onClickStake(token)"  v-if="token" text="Stake") 


    
</template>


<script lang="ts" setup>
import type { NftFragment } from '#gql';

const { stakeMetashare } = useMetashareStakingContract()


const { data: tokens } = useTokenData()

const metashares = tokens.value?.filter(item => item?.tokenInfo?.type === 'metashare' && (item?.tokenInfo.tier == 'eternalab' || item?.tokenInfo?.tier == 'new-lands'))

const onClickStake = (token: NftFragment) => {
  if (token.balance)
    return stakeMetashare({ token, amount: token.balance })
  console.log("No balance of this token", token)
}
</script>
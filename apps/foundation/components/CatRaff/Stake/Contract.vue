<template lang="pug">
div(grid="~ gap-6 lg:cols-2" p="4")
  Card(v-for="(listItem, index) in listItems" :key="listItem.titleKey")
    HList(flex-row-reverse )
      CardTitle(#default) {{ (totalUserRewards) }}
      CardTitle(#detail) Available: 
      CardTitle(flex-grow="1")
        template(#default) {{ $t(`IxtCatRaff.${listItem.titleKey}`) }}
        template(#detail) {{ $t(`IxtCatRaff.${listItem.detailKey}`) }}
    HList(justify="between" gap-6)
      InputsSearchbar(v-if="index === 0" routeKey="IxtCatRaff.inputText" label="IXT")
      InputsSearchbar(v-else-if="index === 1" routeKey="IxtCatRaff.inputText" label="TICKET" space-x="6")
      ButtonGlitch(v-if="index === 0" btn="~ primary-outline-cut" @click="$emit('')" :text="$t('IxtCatRaff.stakeIxtBtn')")
      ButtonGlitch(v-else-if="index === 1" btn="~ primary-outline-cut" @click="$emit('')" :text="$t('IxtCatRaff.addTicketBtn')")


</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';

const { totalIXTRewards } = useStakingPools();

const totalUserRewards = computed(() => roundToDecimals(totalIXTRewards.value.totalUserRewardPerDay, 4));


console.log("userRewards", totalIXTRewards.value)
    

const listItems = [
{
  titleKey: 'stakeForTickets',
  detailKey: 'oneTicket'
},
{
  titleKey: 'AddTickets',
  detailKey: 'weekToWeek'
},
{
  titleKey: 'WithdrawIXT',
  detailKey: 'noParticipant'
},
{
  titleKey: 'ClaimIXTReward',
  detailKey: 'claimCatRaff'
  }
];

  </script>
  
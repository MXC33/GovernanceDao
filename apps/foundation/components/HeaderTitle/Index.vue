<template lang="pug">
Vlist(p="12" space-y="6")
  header(space-y="3")
    h2(text="3xl" font="bold") {{ selectedHeader.title }}
    p {{ selectedHeader.paragraph }}
</template>

<script lang="ts" setup>

import { ref, computed, defineProps } from 'vue';


interface HeaderTitles {
  title: string,
  paragraph: string
}

const headerTitles: HeaderTitles[] = [
  // Dashboard Titles
  {
    title: "STAKING DASHBOARD",
    paragraph: "DEFI Dashboard for your assets."

  },
  {
    title: "EARN BY STAKING",
    paragraph: "Earn rewards for contributing to liquidity and safety."
  },
  {
    title: "IXT STAKING",
    paragraph: "Earn rewards for contributing to liquidity and safety."
  },
  {
    title: "YOUR TERRITORIES",
    paragraph: "Explore your territory NFTs and their total payout amounts"
  },
  {
    title: "ENERGY STAKING",
    paragraph: "Stake Energy Tokens to recieve IXT or Gravity Grade Packs with PIX Contents. You can also stake Energy in the sustainability pool to donate a percentage of your yield to the Amelia Foundation."
  },
  {
    title: "LANDMARKS",
    paragraph: "Explore your landmarks and discover the commission amounts paid out to your account."
  },
  {
    title: "METASHARE STAKING",
    paragraph: "Each corporation’s treasury acts as a staking pool for MetaShares and the reward is $IXT."
  },
  {
    title: "GOVERNANCE",
    paragraph: "Track proposal statuses and vote on changes."
  },
  // Metashare Titles
  {
    title: "METASHARE STAKING",
    paragraph: "Each corporation’s treasury acts as a staking pool for MetaShares and the reward is $IXT."
  },
  {
    title: "CORPORATIONS METASHARE",
    paragraph: "MetaShares grant you the authority to influence the corporation's future and to earn a monthly portion of the corporation's profits."
  },
  {
    title: "CORPORATIONS' PERFORMANCE",
    paragraph: "Rewards earned from staking MetaShares in the last 24 hours and 30 days."
  },
  // Territories Titles
  {
    title: "TERRITORY STAKING",
    paragraph: "Explore your territory NFTs and their total payout amounts"
  },
  {
    title: "YOUR TERRITORIES",
    paragraph: "Search and select from the territories you own."
  },
  // Landmarks Titles
  {
    title: "REWARDS",
    paragraph: "Claim all your rewards"
  },
  {
    title: "MY LANDMARKS",
    paragraph: "Search and select from the landmarks you own."
  },
  {
    title: "EXPLORE LANDMARKS",
    paragraph: "Search and select from the landmarks"
  },
  // Governance Titles
  {
    title: "GOVERNANCE",
    paragraph: "Explore your territory NFTs and their total payout amounts"
  },
  {
    title: "Track proposal statuses and vote on changes.",
    paragraph: "Explore your territory NFTs and their total payout amounts"
  },
]

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
});

const selectedHeader = computed(() => headerTitles[props.index]);


</script>
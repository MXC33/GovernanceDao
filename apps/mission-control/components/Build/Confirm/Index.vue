<template lang="pug">
Popup(:title="title", @cancel="clearStaking", @confirm="confirmStake" sender="proxy-of-change") 

  template(v-slot:default) 
    HelperWriter(:lines="message")

  template(v-slot:images)
    TokenDisplay(:token="proposedNFT" v-if="proposedNFT" :quantity="proposedResourcePick?.quantity")

</template>

<script setup lang="ts">
const { t } = useI18n()

const { proposedStakeType, proposedNFT, proposedStakeNFTType, proposedResourcePick, confirmStake } = useStakeNFTFlow()

const { clearStaking } = useStakeNFTContracts()

const title = computed(() => `${proposedStakeType.value} ${proposedStakeNFTType.value} `)

const message = computed(() =>
  t(`build.confirm.${proposedStakeType.value}.${proposedStakeNFTType.value}`)
)

</script>

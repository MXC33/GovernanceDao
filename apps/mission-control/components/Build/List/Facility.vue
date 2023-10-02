<template lang="pug">
template(v-for="group in facilityGroup" v-if="facilityGroup.length > 0")
  ListSection(title="facilities")
    BuildItemFacility(:item="item" v-for="item in group.items",  @click="selectNFTToStake(item)" :is-selected="isNFTActive(item.tokenId, item.tokenInfo.type)")

ListEmpty(type="facility" v-else)
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql';


const { selectNFTToStake, isNFTActive } = useStakeNFTFlow()

const { nfts } = useUserData()

const facilityList = computed<NftFragment[]>(() =>
  nfts.value.filter((item) => item?.tokenInfo.type == 'facility') as NftFragment[]
)

const facilityGroup = computed(() => categorizeNFTs(facilityList.value))
</script>
<template lang="pug">
template(v-for="group in groupedTech" v-if="groupedTech.length > 0")
  ListSection(:title="group.name")
    BuildItemTech(:item="item" v-for="item in group.items", @click="selectNFTToStake(item)" :is-selected="isNFTActive(item.tokenId, item.tokenInfo.type)" :accented="false")
ListEmpty(type="tech" v-else)

</template>

<script setup lang="ts">
import type { NftFragment } from '#gql';

const { selectNFTToStake, isNFTActive } = useStakeNFTFlow()
const { droneList, roverList } = useTech()

const techList = computed<NftFragment[]>(() => droneList.value.concat(roverList.value))
const groupedTech = computed(() => categorizeNFTs(techList.value))
</script>
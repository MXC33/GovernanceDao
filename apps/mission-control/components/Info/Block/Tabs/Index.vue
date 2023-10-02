<template lang="pug">
VList(space-y="2")
  HList()
    InfoBlockTabsItem(v-for="(tab, index) in tabs" :is-selected="activeTab(index)" @click="onClickTab(index)") {{ tab }}

  Transition(name="slide-left" mode="out-in")
    VList(:key="selectedTab" space-y="6")
      InfoBlock(:block="items" v-for="items in block.groups[selectedTab].content", :token="token")

  
</template>
  
<script lang="ts" setup>
import type { InfoBlockTabs } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const tabs = computed(() => props.block.groups.map((group) => group.tab))
const selectedTab = ref(0)

watch(() => props.token, () => selectedTab.value = 0)

const onClickTab = (index: number) => {
  selectedTab.value = index
}

const props = defineProps<{
  block: InfoBlockTabs,
  token: NftFragment
}>()

const activeTab = (index) => selectedTab.value == index


</script>
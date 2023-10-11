<template lang="pug">
CorporationUpgradeSelect(:items="facilities" header="Upgrade Facility")
  template(#cart v-if="hasCooldown")
    CorporationNewlandsUpgradeSpeedup(:key="upgradeFinishTime")

CorporationComplete(v-if="false")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { InfoBlock } from '~~/composables/useInfoBlocks';


definePageMeta({
  layout: 'corporation'
})

const { execute: fetchFacilityCooldown, data: upgradeFinishTime } = useFacilityCooldownTimeleftData()
const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()
const { execute: fetchUpgradeData } = useFacilityUpgradeData()
const { currentTime } = useGlobalTimestamp()
const { t } = useI18n()

await fetchPlayerBaseLevel()
await fetchFacilityCooldown()

const { execute: fetchNewLandsInfo } = useNewlandsData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()

await Promise.all([
  fetchNewLandsInfo(),
  fetchTokens(),
  fetchBaseLevelCapacity(),
  fetchUpgradeData()
])

const hasCooldown = computed(() => upgradeFinishTime.value * 1000 > currentTime.value)

const { nfts } = useUserData()

const getBlock = (item: NftFragment, level: number): InfoBlock[] => {
  const currentLevel = item.tokenInfo?.level

  return ([
    {
      blockType: 'header',
      items: [{
        name: 'Upgrade: ',
        value: t(`corporations.new-lands.construction.upgrade.toLevel.${currentLevel}`),
        state: 'accent'
      },
      {
        name: 'Prod. time: ',
        value: "7 days"
      },
      {
        name: 'Upgrade Req.: ',
        value: "Lv. 30"
      }]
    },
    {
      blockType: 'table',
      items: FacilityLevels.map((level) => {
        const isCurrent = currentLevel == level
        const currentCopy = isCurrent ? '(CURRENT)' : ''
        const output = FacilityOutputCycle[item.tokenInfo.tier]['A']
        const outputPer24Hour = roundToDecimals((24 / output) * FacilityEnergyByLevelMultiplier[level], 2)
        const isDisabled = level - currentLevel > 2
        const state = isDisabled ? 'disabled' : (isCurrent ? null : 'active')

        return {
          name: `LEVEL ${level} ${currentCopy}`,
          value: `${outputPer24Hour} ENERGY / ${FacilityOutputCycle[item.tokenInfo.tier]['A']}H`,
          state
        }
      })
    },
    {
      blockType: 'description',
      title: 'UPGRADE DESCRIPTION',
      body: 'To upgrade your facilities, you must first gather an adequate amount of resources. Once you have the resources, select the facility that you want to upgrade and wait for the seven-day upgrade process to complete.'
    }
  ])
}

const facilities = computed(() =>
  nfts.value?.filter((item) => item.tokenInfo.type == 'facility')?.map((item) => ({
    infoBlocks: getBlock(item, 2),
    ...addAdjustableToToken(item)
  }))
)
</script>

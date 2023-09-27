<template lang="pug">
VList
  HList(justify="between")
    HList(space-x="2" items="center")
      VList(w="8" h="8" b="1 mc-white_40" p="1" items="center" align="center" justify="center")

        GWS()

      VList()
        div(color="mc-white" font="normal") {{ $t(`overview.perks.prospect`) }}

    HList(px="4" items="center")

      div(v-for="(lvl, index) in level" :key="index")
        div(v-if="lessThan12Rents && lvl.name == 'gws'" color="mc-white_60" font="bold") {{ $t(`overview.perks.unlocks`) }} 12
        div(v-else-if="!lessThan12Rents && lvl.name == 'gws'" color="mc-mint" font="bold") {{ lvl.capacity/25 }} {{ $t(`overview.perks.orders`) }}

  div(b="b-1 mc-white_40" mt="2" mb="2")

  HList(justify="between")
    HList(space-x="2" items="center")
      VList(w="8" h="8" b="1 mc-white_40" p="1" items="center" align="center" justify="center")

        ETERNALAB

      VList
        div(color="mc-white" font="normal")  {{ $t(`overview.perks.refine`) }}

    HList(px="4" items="center")


      div(v-for="(lvl, index) in level" :key="index")
        div(v-if="lessThan12Rents && lvl.name == 'eternalab'" color="mc-white_60" font="bold") {{ $t(`overview.perks.unlocks`) }} 12
        div(v-else-if="!lessThan12Rents && lvl.name == 'eternalab'" color="mc-mint" font="bold") {{ lvl.capacity/25 }} {{ $t(`overview.perks.orders`) }}

  div(b="b-1 mc-white_40" mt="2" mb="2")

  HList(justify="between")
    HList(space-x="2" items="center")
      VList(w="8" h="8" b="1 mc-white_40" p="1" items="center" align="center" justify="center")

        NEWLANDS

      VList
        div(color="mc-white" font="normal") {{ $t(`overview.perks.build`) }}

    HList(px="4" items="center")

      div(v-for="(lvl, index) in level" :key="index")
        div(v-if="lessThan24Rents && lvl.name == 'new-lands'" color="mc-white_60" font="bold") {{ $t(`overview.perks.unlocks`) }} 24
        div(v-else-if="!lessThan24Rents && lvl.name == 'new-lands'" color="mc-mint" font="bold") {{ lvl.capacity }} {{ $t(`overview.perks.orders`) }}

  div(b="b-1 mc-white_40" mt="2" mb="2")

</template>

<script lang="ts" setup>
import GWS from '~/assets/images/ui/corporations/overview/gws-icon.svg'
import NEWLANDS from '~/assets/images/ui/corporations/overview/newlands-icon.svg'
import ETERNALAB from '~/assets/images/ui/corporations/overview/eterna-icon.svg'

const { activeTileRents } = useTiles()

const totalRents = computed(() => activeTileRents.value + 6)
const lessThan12Rents = computed(() => totalRents.value < 12)
const lessThan24Rents = computed(() => totalRents.value < 24)

const { execute: fetchBaseLevelCapacity, data: baseLevelData } = useBaseLevelCapacityData()
await fetchBaseLevelCapacity()

interface BaseData {
  name: string
  capacity: number
}

const level: BaseData[] = baseLevelData.value.map((item) => ({
  ...item,
  name: item.name,
  capacity: item.capacity
}))

const divided: BaseData[] = baseLevelData.value.map((item) => ({
  ...item,
  name: item.name,
  capacity: item.capacity / 4
}))

</script>
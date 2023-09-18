<template lang="pug">
VList(gap="4" uppercase="~")

  VList
    OverviewPerksTitle
      template(#header) {{ $t(`overview.mcBaseLevel`) }}
      template(#info)
        HelperInfoWrapper
          template(#info-here)
            div(v-html="$t(`overview.info.progression`)")

    VList
      OverviewPerksProgression
        template(#icon)
          MC
        template(#title)
          div.perks-text {{ $t(`overview.perks.base-level`) }}
        template(#perk)
          div {{ playerBaseLevel }}

    VList
      OverviewPerksProgression
        template(#icon)
          PERK
        template(#title)
          div {{ $t(`overview.perks.active-tiles`) }}
        template(#perk)
          div {{ totalRents }}/36

  VList
    OverviewPerksTitle
      template(#header) {{ $t(`overview.perks.corporation-capacity`) }}
      template(#info)
        HelperInfoWrapper
          template(#info-here) {{ $t(`overview.info.capacity`) }}

    VList
      OverviewPerksCorporation


</template>
<script lang="ts" setup>
import MC from '~/assets/images/ui/resources/mclevel-icon.svg'
import PERK from '~/assets/images/ui/resources/perk-icon.svg'

const { playerBaseLevel } = useUserData()
const { activeTileRents } = useTiles()

const totalRents = computed(() => activeTileRents.value + 6)

</script>

<style>
.perks-text strong {
  color: #D6A43F
}
</style>
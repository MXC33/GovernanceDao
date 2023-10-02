<template lang="pug">
VList(space-y="4")
  InfoStory(:id="id")
    ClientOnly
      HelperWriter(v-if="id == 'new-lands'" :lines="newLands")
      HelperWriter(v-else-if="id == 'y-space'" :lines="ySpace")
      HelperWriter(v-else-if="id == 'astro-cap'" :lines="astroCap")
      HelperWriter(v-else-if="id == 'gws'" :lines="gws")
      HelperWriter(v-else-if="id == 'haveblue'" :lines="haveBlue")
      HelperWriter(v-else-if="id == 'gravity-grade'" :lines="gravityGrade")


      HelperWriter(v-else :lines="$t(`corporations.${id}.overview.intro`)")

  CorporationOverviewImage(flex-grow="1" display="lt-md:none")
</template>

<script lang="ts" setup>
const id = useActiveCorporation()

const { t } = useI18n()


const newlandsLines: string[] = [
  t(`corporations.new-lands.overview.intro.one`),
  t(`corporations.new-lands.overview.intro.two`),
  t(`corporations.new-lands.overview.intro.three`),
  t(`corporations.new-lands.overview.intro.four`),
]

const yspaceLines: string[] = [
  t(`corporations.y-space.overview.intro.one`),
  t(`corporations.y-space.overview.intro.two`),
  t(`corporations.y-space.overview.intro.three`),
  t(`corporations.y-space.overview.intro.four`),
  t(`corporations.y-space.overview.intro.five`),
  t(`corporations.y-space.overview.intro.six`),
  t(`corporations.y-space.overview.intro.seven`),
]

const astrocapLines: string[] = [
  t(`corporations.astro-cap.overview.intro.one`),
  t(`corporations.astro-cap.overview.intro.two`),
  t(`corporations.astro-cap.overview.intro.three`),
  t(`corporations.astro-cap.overview.intro.four`),
]

const gwsLines: string[] = [
  t(`corporations.gws.overview.intro.one`),
  t(`corporations.gws.overview.intro.two`),
  t(`corporations.gws.overview.intro.three`),
  t(`corporations.gws.overview.intro.four`),
  t(`corporations.gws.overview.intro.five`),
  t(`corporations.gws.overview.intro.six`),
  t(`corporations.gws.overview.intro.seven`),
  t(`corporations.gws.overview.intro.eight`),
  t(`corporations.gws.overview.intro.nine`),
  t(`corporations.gws.overview.intro.ten`),
]

const haveblueLines: string[] = [
  t(`corporations.haveblue.overview.intro.one`),
  t(`corporations.haveblue.overview.intro.two`),
  t(`corporations.haveblue.overview.intro.three`),
  t(`corporations.haveblue.overview.intro.four`),
  t(`corporations.haveblue.overview.intro.five`),
  t(`corporations.haveblue.overview.intro.six`),
  t(`corporations.haveblue.overview.intro.seven`),
  t(`corporations.haveblue.overview.intro.eight`),
  t(`corporations.haveblue.overview.intro.nine`),
  t(`corporations.haveblue.overview.intro.ten`),
]

const ggLines: string[] = [
  t(`corporations.gravity-grade.overview.intro.one`),
  t(`corporations.gravity-grade.overview.intro.two`),
  t(`corporations.gravity-grade.overview.intro.three`),
  t(`corporations.gravity-grade.overview.intro.four`),
  t(`corporations.gravity-grade.overview.intro.five`),
  t(`corporations.gravity-grade.overview.intro.six`),
  t(`corporations.gravity-grade.overview.intro.seven`),
  t(`corporations.gravity-grade.overview.intro.eight`),
  t(`corporations.gravity-grade.overview.intro.nine`),
  t(`corporations.gravity-grade.overview.intro.ten`),
  t(`corporations.gravity-grade.overview.intro.eleven`),
]

const newLands = randomLinesGenerator(newlandsLines)
const ySpace = randomLinesGenerator(yspaceLines)
const astroCap = randomLinesGenerator(astrocapLines)
const gws = randomLinesGenerator(gwsLines)
const haveBlue = randomLinesGenerator(haveblueLines)
const gravityGrade = randomLinesGenerator(ggLines)



</script>
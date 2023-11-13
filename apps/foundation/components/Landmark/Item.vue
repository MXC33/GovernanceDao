<template lang="pug"> 
div(grid="~ cols-1 md:cols-3 gap-6")
  VList(v-for="item in data")
    Card(flex-grow="1")
      TokenMedia(:token="item")
      div(space-y="-3")
        CardTitle(:large="true") {{ item.tokenInfo?.title }}
        Star(w="2" v-for="star in getStars(item)" :key="star" display="inline")

      Divider(mx="-6")

      HList(space-x="3")
        TitleDetail()
          template(#detail) {{ $t(`landmarks.sharesLabel`) }}
          template(#default) {{ getShares(item) }}

        TitleDetail()
          template(#detail) {{ $t(`landmarks.earningDiameterLabel`) }}
          template(#default) {{ getRadius(item) }}
      Divider(mx="-6")
      ButtonGlitch(btn="~ primary-outline-cut" @click="onClickView(item)" :text="$t('general.view')")
</template>
  
<script lang="ts" setup>
import type { NftFragment } from '#gql';
import Star from '~/assets/images/star-golden.svg'

const { data } = defineProps<{
  data: NftFragment[]
}>()


const getShares = (data: NftFragment) => data.tokenInfo?.attributes?.find(item => item?.traitType == 'Total Shares')?.value

const getStars = (data: NftFragment) => {
  const stars = data.tokenInfo?.attributes?.find(item => item?.traitType == 'Rating')?.value
  return extractNumber(stars ?? "")
}

const getRadius = (data: NftFragment) => data.tokenInfo?.attributes?.find(item => item?.traitType == 'Earning Diameter')?.value

const extractNumber = (string: string) => {
  const match = string.match(/\d+/);  // This regex matches one or more digits
  return match ? parseInt(match[0], 10) : null;
}

const replaceGameWithNetempire = (url: string) => {
  return url.replace("/game/", "/netempire/");
}


const onClickView = (item: NftFragment) => {
  if (!item.external_url)
    return
  window.open(replaceGameWithNetempire(item.external_url))
}


</script>
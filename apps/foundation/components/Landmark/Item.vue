<template lang="pug"> 
div(grid="~ cols-1 md:cols-3 gap-6" flex-grow)
  VList(v-for="item in data")
    Card()
      TokenMedia(:token="item" class="w-full md:w-auto h-auto md:h-1/2")
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

      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('claim')" :text="$t('landmarks.claimButton')")
</template>
  
<script lang="ts" setup>
import type { NftFragment } from '#gql';
import Star from '../../public/assets/landmark/star-golden.svg'

const { data } = defineProps<{
  data: NftFragment[]
}>()


const getShares = (data: NftFragment) => data.tokenInfo?.attributes?.find(item => item?.traitType == 'Total Shares')?.value

const getStars = (data: NftFragment) => {
  const stars = data.tokenInfo?.attributes?.find(item => item?.traitType == 'Rating')?.value
  return extractNumber(stars ?? "")
}

const getRadius = (data: NftFragment) => data.tokenInfo?.attributes?.find(item => item?.traitType == 'Earning Diameter')?.value

function extractNumber(string: string) {
  const match = string.match(/\d+/);  // This regex matches one or more digits
  return match ? parseInt(match[0], 10) : null;
}


</script>
<template lang="pug">
HList(flex-grow="1" justify="center" items="center" uppercase="~" py="4" mr="10 md:20")
  HList.from(v-if="state.from.token.tokenInfo.type == 'astro-gold'")
    AGOLD( w="8" h="8")
    HList(color="$mc-accent" font="bold" items="center" pl="2") {{ state.from.value }} {{ $t(`general.agold`) }}

  HList.from(v-else)
    IXT( w="8" h="8")
    HList(color="$mc-accent" font="bold" items="center" pl="2") {{ state.from.value }} {{ state.from.token.tokenInfo.type }}


  HList(px="4")
    RIGHT(w="5")

  HList.to(v-if="state.from.token.tokenInfo.type == 'astro-gold'")
    IXT( w="8" h="8")
    HList(color="$mc-accent" font="bold" items="center" pl="2") {{ state.from.value }} {{ state.to.token.tokenInfo.type }}

  HList.to(v-else)
    AGOLD( w="8" h="8")
    HList(color="$mc-accent" font="bold" items="center" pl="2") {{ state.from.value }} {{ $t(`general.agold`) }}
</template>

<script lang="ts" setup>
import RIGHT from '~/assets/images/ui/astro-arrow.svg'

import AGOLD from '~/assets/images/ui/resources/astro-gold-icon.svg'
import IXT from '~/assets/images/ui/resources/ixt-noborder-icon.svg'


const { state } = useCorporationSwap()

</script>
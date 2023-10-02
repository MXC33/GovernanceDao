<template lang="pug">
CorporationItemsAndDetailListItem(:item="item.token" :no-select="true" :img-object="'contain'" opacity="on-disable:50" pointer-events="on-disable:none" :disable="disabled")
  template(#default)
    HList(space-x="1") 
      div {{ $t('general.inventory') }}

      TokenBalance(:token="item.token")

    HList(space-x="1" justify="start")
      TitleWithIcon(icon="cut-corner" fill="$corporation-text-color" w="auto") {{ $t(`general.required`) }}: 
      div(color="$mc-accent on-low:red-500" :low="!hasBalance") MIN. {{ item.min }}

    Transition(name="icon" mode="out-in")
      div(pos="absolute" inset="0" bg="black opacity-10" v-if="disabled" transition="all")

  template(#afterItem v-if="item.adjustable")
    HList(items="center" mt="-1px")
      HList(b="1 $mc-accent" items="center" h="10" flex-grow="1")

        TokenSlideshow(:tokens="outputTokens" :icon="true"  flex-shrink="0" h="8" w="8" v-if="outputTokens?.length > 1 && !disableSlideshow" :image="true")
        TokenImage(:token="outputTokens[0]" h="8" w="8" flex-shrink="0" v-else)


        HList(p="1.5" b="l-1 $mc-accent" h="full" flex-grow="1" space-x="6" items="center" uppercase="~" flex-shrink="0")
          slot


      Adjustable(v-model="item" h="10" flex-grow="1" :inline="true" :hide-max="true" bg="$mc-accent-20" b="$mc-accent 1 l-0" :is-locked="disabled" color="$mc-accent" fill="$mc-accent")

</template>


<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations'

const { balanceOfToken } = useUserData()

defineProps<{
  outputTokens?: NftFragment[],
  disableSlideshow?: boolean,
  disabled?: boolean
  isLocked?: boolean
}>()

const hasBalance = computed(() => balanceOfToken(item.value.token) >= item.value.min)

const item = defineModel<CorporationPaymentToken>()
</script>
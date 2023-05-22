<template lang="pug">
VList(p="5" capitalized="~" space-y="5")
  VList(items="center" p="3")
      div(text="2xl white" v-html="$t(`marketplaceFullscreen.transfer.title`)")
      HList(space-x="3")
          Image(w="10" h="10" b="~")
          TokenImage(:token="token" pos="absolute" inset="0" object="contain center" :key="getTokenKey(token)")
          VList()
              div(text="white") Title 
              div(text="white") Planet IX  
          div(flex="grow")
          div(text="white" v-html="$t(`marketplaceFullscreen.transfer.own`)")

  div(text="white") Quantity
  Adjustable(v-model="Image" h="10")

  //-VList(items="center" space-y="3")
  div(text="white") Wallet Adress
  Input(text="2xl white center" bg="white" placeholder="e.g Dx0000" border="")
  div()
      div(text="white" v-html="$t(`marketplaceFullscreen.transfer.warningText`)")
  HList(space-x="3")
    FormCheckbox(v-model="isChecked") 
    div(text="white" v-html="$t(`marketplaceFullscreen.transfer.verifyText`)")

  button(m="auto" text="2xl white" bg="gray" p="2" v-if="isChecked") Transfer Item 
</template>

<script lang="ts" setup>
import Image from "~/assets/icons/plus.svg"
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const { getTokenKey } = useTokens()

const isChecked = ref(false)
const props = defineProps<{
  token: IXToken,
}>()
</script>
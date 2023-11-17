<template lang="pug">
VList(space-y="3")

  p {{ $t('buy.description') }}

  HList(b="1 pink" rounded="full" p="y-3 x-6" w="full" )
    div(flex-grow="1" items="center" text="center lg" font="prime" max-w="100%" overflow="auto") {{ token }}
    button(justify-self="end" @click="onCopy" pos="sticky right-0" opacity="hover:80" transition="all")
      CopyIcon(w="6" h="6")

      Tooltip(v-model="copyToolTipActive") Copied!
</template>

<script lang="ts" setup>
import CopyIcon from '~/assets/images/copy.svg'

const { token } = useRuntimeConfig().public
const copyToolTipActive = refAutoReset(false, 1000)

const onCopy = () => {
  navigator.clipboard.writeText(token);
  copyToolTipActive.value = true
}
</script>
<style>
.wallet-icon {
  box-shadow: 0 0 10px 20px #000;
  right: -0.5rem;
  background: black;
}
</style>

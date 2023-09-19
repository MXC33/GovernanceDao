<template lang="pug">
HList(flex="~" justify="between" items="center" w="full" text="md" font="normal" color="white")
  HList(space-x="2" items="center")
    WalletIcon(w="5")
    p() Wallet balance

  HList(space-x="2" items="center")
    p() {{ roundToDecimals(astroGoldBalance, 2) }} AGOLD
    CirclePlusIcon(w="5" cursor="pointer" @click="onOpenSwapModal")

</template>
<script lang="ts" setup>
import WalletIcon from '~/assets/icons/wallet.svg'
import CirclePlusIcon from '~/assets/icons/circle-plus.svg'
import { useAstroGoldContract } from "@ix/base/composables/Contract/useAstroGoldContract";

const { refreshAstroGoldBalance, astroGoldBalance } = useAstroGoldContract()

refreshAstroGoldBalance()

const { backModal, parentBackModal } = defineProps<{
  backModal: string
  parentBackModal: string
}>()


const { displayPopup } = usePopups()
const onOpenSwapModal = async () => {
  displayPopup({
    type: 'popup-type-swap',
    backModal: backModal,
    parentBackModal: parentBackModal
  })
}

</script>

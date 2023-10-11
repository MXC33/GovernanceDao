<template lang="pug">
button(p="2" @click="$emit('leftButton')" whitespace="nowrap")
    Transition(name="fade-slow" mode="out-in")
      span(v-if="state == 'disconnected'") {{ $t(`general.navigation.menu.connectWallet`)}}

      span(v-else-if="balance != undefined" w="25" text="ix-mint") {{ roundToDecimals(balance, 2) }} IXT

      HelperLoader(v-else fill="ix-mint on-wallet:ix-orange" w="4" :wallet="state != 'connected'")
</template>

<script lang="ts" setup>
import { WalletState } from '~/composables/Contract/useWallet';
import PlusIcon from "~/assets/images/icons/plus.svg";

defineEmits(['leftButton', 'rightButton'])

defineProps<{
  balance: number | null | undefined,
  state: WalletState
}>()

</script>

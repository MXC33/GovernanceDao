<template lang="pug">
HList(p="6" bg="ix-black" b="b-1 gray-600")
  NuxtLink(v-if="walletState !== 'connected'" to="/connect" @click="$emit('close')" btn="soft-ix-orange lg" w="full" color="white") {{ $t(`general.navigation.menu.connectWallet`)}}

  HList(v-else flex-grow="1" cut="bottom-right s-sm b-ix-orange opacity-60" bg="ix-orange opacity-20")
    AOCIcon(w="25" p="3")

    VList(b="l-1 ix-orange opacity-40" flex-grow="1")
      VList(p="2" b="b-1 ix-orange opacity-40" v-if="userId")
        div(text="white") {{userId}} 
        div(color="ix-orange") {{ $t(`general.navigation.menu.account`)}}

        //-NuxtLink(to="/account" color="ix-orange") Account


      HList(flex-grow="1" items="center")
        HList(b="r-1 ix-orange opacity-40" p="2" flex-grow="1" h="full" items="center" space-x="1" font="bold")
          div(text="gray") IXT: 
          div(text="ix-mint") {{ roundToDecimals(ixtBalance ?? 0, 2) }}

</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])
import AOCIcon from '~/assets/images/icons/aocbadge.svg'


const { enable: showIXTSwap } = useIXTSwapVisible()
const { walletState } = useWallet()
const { ixtBalance } = useUserData()
const { user } = useUser()

const userId = computed(() => user.value?.username || null)
</script>
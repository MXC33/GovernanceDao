<template lang="pug">
HList(p="6" bg="ix-black" b="b-1 gray-600" class="border-white")
  NuxtLink(v-if="walletState !== 'connected'" to="/connect" @click="$emit('close')" btn="soft-ix-orange lg" w="full" class="pink-btn" ) {{ $t(`marketplace.navigation.menu.connectWallet`)}}

  HList(v-else flex-grow="1" cut="bottom-right s-sm b-ix-orange opacity-60" bg="ix-orange opacity-20")
    AOCIcon(w="25" p="3")

    VList(b="l-1 ix-orange opacity-40" flex-grow="1" class="border-white")
      VList(p="2" b="b-1 ix-orange opacity-40" v-if="userId")
        div() {{userId}}
        NuxtLink(to="/account" color="ix-orange" class="pink-text") {{ $t(`marketplace.navigation.menu.account`) }}

      HList(flex-grow="1" items="center")
        HList(b="r-1 ix-orange opacity-40" p="2" flex-grow="1" h="full" items="center" space-x="1" font="bold")
          div(text="gray" class="pink-text") IXT:
          div(text="ix-mint" class="pink-text") {{ roundToDecimals(ixtBalance ?? 0, 2) }}

        HList( p="l-3 r-3")
          PlusIcon(fill="white" w="3" @click="showIXTSwap")
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])
import AOCIcon from '~/assets/images/icons/aocbadge.svg'
import PlusIcon from '~/assets/images/icons/plus.svg'

const { enable: showIXTSwap } = useIXTSwapVisible()
const { walletState } = useWallet()
const { ixtBalance } = useIXTContract()
const { user } = useUser()

const userId = computed(() => user.value?.username || null)
</script>

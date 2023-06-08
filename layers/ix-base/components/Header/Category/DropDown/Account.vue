<template lang="pug">
VList(bg="ix-black" b="b-1 gray-600")
  HList(p="6")
    NuxtLink(v-if="walletState !== 'connected'" bg="$mc-orange_20" b="1 $mc-orange" color="$mc-orange" px="8" to="/connect") 
      div(text="center lg" p="2" font="bold") Connect Wallet

    HList(v-else flex-grow="1" cut="bottom-right sm b-ix-orange opacity-60")
      Icon(w="25" p="3" bg="$mc-orange_20")

      VList(flex-grow="1")
        div(p="2" b="l-1 b-1 $mc-orange_40" text="white" bg="$mc-orange_20" v-if="userId") {{userId}}
          NuxtLink(to="/account")
            div(text="$mc-orange" font="") My Assets

        HList()
          HList(b="l-1 r-1 $mc-orange_40" p="2" bg="$mc-orange_20" space-x="1")
            div() IXT: 
            div(text="$mc-mint") {{ Math.round((ixtBalance ?? 0) * 100) / 100 }}
          HList(bg="$mc-orange_20" p="l-3 r-3")
            PlusIcon(fill="white" w="3" @click="$emit('swap')")  
</template>

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';
const { walletState } = useWallet()
const { ixtBalance, fetchIXT } = useIXTContract()
const { user } = useUser()

await fetchIXT()

const emit = defineEmits(['swap', 'ConnectWallet'])

const userId = computed(() => user.value?.username || null)

const Icon = await import(`../../../../assets/images/header/dropdown/badges/aocbadge.svg`).catch(() => FallbackVue)
const PlusIcon = await import(`../../../../assets/images/icons/plus.svg`).catch(() => FallbackVue)
</script>
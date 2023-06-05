<template lang="pug">
div(bg="black")
  HList(p="6")
    //-div(grow="~")
    NuxtLink(v-if="walletState !== 'connected'" bg="$mc-orange_20" h="48px" b="1 $mc-orange" color="$mc-orange" px="8" to="/connect" grow="~") 
      div(text="center lg" p="2" font="bold" @click="ConnectWallet") Connect Wallet 
    HList(v-else grow="~")
      Icon(w="25" p="3" b="1 $mc-orange_40" bg="$mc-orange_20")
      VList(opacity="100%" grow="~")
        div(p="2" b="1 $mc-orange_40" text="white" bg="$mc-orange_20" v-if="userId") {{userId}}
          NuxtLink(to="/account")
            div(text="$mc-orange" font="") My Assets
        HList()
          HList(b="1 $mc-orange_40" p="2" grow="~" bg="$mc-orange_20")
            div() IXT : 
            div(text="$mc-mint") {{ Math.round((ixtBalance ?? 0) * 100) / 100 }}
          PlusIcon(b="1 $mc-orange_60" fill="white" h="10" p="3" cut="bottom-right" bg="$mc-orange_40" @click="$emit('swap')")  
    //-div(grow="~")
</template>

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';
const { walletState } = useWallet()
const { ixtBalance, fetchIXT } = useIXTContract()
const { user } = useUser()

await fetchIXT()

const emit = defineEmits(['swap', 'ConnectWallet'])

const ConnectWallet = () => {
  emit('ConnectWallet')
  console.log("ConnectWallet")
}

const userId = computed(() => user.value?.username || null)
const Icon = await import(`../../../../assets/images/header/dropdown/badges/aocbadge.svg`).catch(() => FallbackVue)
const PlusIcon = await import(`../../../../assets/images/icons/plus.svg`).catch(() => FallbackVue)
</script>
<template lang="pug">
div(bg="black")
  HList(p="6")
    //-div(grow="~")
    HList(grow="~")
      Icon(w="20" p="3" b="1 $mc-orange_40" bg="$mc-orange_20" )
      VList(opacity="100%" grow="~")
        div(p="2" b="1 $mc-orange_40" text="white" bg="$mc-orange_20" v-if="userId") {{userId}}
          NuxtLink(to="/account")
            div(text="$mc-orange" font="") Account settings
        HList()
          HList(b="1 $mc-orange_40" p="2" grow="~" bg="$mc-orange_20")
            div() IXT : 
            div(text="green") {{ Math.round((ixtBalance ?? 0) * 100) / 100 }}
          div(b="1 $mc-orange_60" p="1" cut="bottom-right" bg="$mc-orange_40" @click="$emit('swap')") +  
    //-div(grow="~")
</template>

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';
const { ixtBalance, fetchIXT } = useIXTContract()
const { user } = useUser()

await fetchIXT()

defineEmits(['swap'])

const userId = computed(() => user.value?.username || null)
const Icon = await import(`../../../../assets/images/header/dropdown/badges/aocbadge.svg`).catch(() => FallbackVue)
</script>
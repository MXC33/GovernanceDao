<template lang="pug">
div(bg="black")
  HList(p="6")
    div(grow="~")
    HList()
      Icon(w="20" p="3" b="1 $mc-orange_40" bg="$mc-orange_20")
      VList(opacity="100%")
        div(p="2" b="1 $mc-orange_40" text="white" bg="$mc-orange_20" v-if="userId") {{userId}}
          div(text="$mc-orange") Account settings
        HList()
          HList(b="1 $mc-orange_40" p="2" grow="~" bg="$mc-orange_20")
            div() IXT : 
            div(text="green") {{ Math.round(ixtBalance * 100) / 100 }}
          div(b="1 $mc-orange_60" p="1" cut="bottom-right" bg="$mc-orange_40") +  
    div(grow="~")
</template>

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';
const { ixtBalance } = useUserData()
const { user } = useUser()

const userId = computed(() => user.value?.username || null)
const Icon = await import(`../../../../assets/images/header/dropdown/badges/aocbadge.svg`).catch(() => FallbackVue)
</script>
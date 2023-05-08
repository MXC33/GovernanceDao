<template lang="pug">
div(pos="fixed right-0 top-0 bottom-0" overflow-y="auto" bg="black" p="5" w="80 md:120" max-w="80%" z="200" color="white" space-y="5" b="l-1 white opacity-20")

  UserHeaderProfile(w="full" h="20" bg="transparent" ring="0" @click="$router.push('/connect')")

  div(space-y="3")
    div(color="white opacity-50") {{$t(`layouts.headers.accountBalance`)}}
    div(bg="warm-gray-900" rounded="10" b="1 white opacity-50" p="3")
      span(color="white opacity-50") {{$t(`layouts.headers.ixt`)}} 
      span(color="mc-mint") {{ Math.round(ixtBalance * 100) / 100 }}

  LayoutHeaderButton(@click="gotoMCPage('/terminal')") {{$t(`layouts.headers.terminal`)}}
  LayoutHeaderButton(@click="gotoMCPage('/')") {{$t(`layouts.headers.inventory`)}}
  LayoutHeaderButton(@click="gotoMCPage('/mission-control')") {{$t(`layouts.headers.missionControl`)}}
  LayoutHeaderButton(@click="gotoIXPage('game')") {{$t(`layouts.headers.game`)}}
  LayoutHeaderButton(@click="gotoIXPage('ix-foundation')") {{$t(`layouts.headers.dashboard`)}}
  LayoutHeaderButton(@click="gotoIXPage('index')") {{$t(`layouts.headers.planetIX`)}}

  div(b="t-1 white opacity-50" py="4")
    ButtonSound(btn="~ white on-enabled:secondary" sound="md" @click="toggleSound" :enabled="isSoundEnabled") Sound {{ isSoundEnabled ? 'enabled' : 'disabled'}}

</template>


<script lang="ts" setup>

const { ixtBalance } = useUserData()
const menuOpen = useSiteMenuOpen()
const router = useRouter()
const { gotoIXPage } = useIXLinks()
const { isSoundEnabled } = useSoundSettings()
const toggleSound = () => { isSoundEnabled.value = !isSoundEnabled.value }

const gotoMCPage = (page: string) => {
  menuOpen.value = false
  router.push(page)
}
</script>

<style>

</style>
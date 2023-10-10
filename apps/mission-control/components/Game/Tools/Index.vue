<template lang="pug">
.game-tools(pos="sticky md:(absolute top-50%) bottom-0 left-0" p="2 lg:4"  translate-y="md:-50%" flex="~ col" justify="end md:center" items="start" self="start" pointer-events="auto" overflow-x="auto")
  Transition(name="slide-left")
    div(grid="~ lt-md:cols-5 auto-rows-fr gap-1 md:gap-2" justify="center" v-if="displayTools") 

      //- Uncomment to show Starter Pack button!
      //-
      //- GameToolsButton.svg-shadow-yellow(:title="$t(`general.navigation.starterPack`)" b="1 mc-yellow_40 hover:mc-yellow" text="mc-yellow" tab-id="starter-pack" @click="activePopup = 'starter-pack'")

      GameToolsButton(:title="$t(`general.navigation.overview`)" tab-id="overview" @click="activateOverviewMenu()")

      GameToolsButton(:title="$t(`general.navigation.build`)" tab-id="build" @click="activateBuildMenu()")

      GameToolsButton(:title="$t(`general.navigation.manager`)" tab-id="task-manager" @click="gameMenu = 'task-manager'")

      GameToolsButton(:title="$t(`general.navigation.inventory`)" tab-id="inventory" @click="navigateTo('/')")

      GameToolsButton(:title="$t(`general.navigation.net-empire`)" tab-id="net-empire" @click="navigateTo('https://planetix.com/netempire', {external:true})")

      //- ButtonTab(title="Raid" tab-id="raid" @click="activePopup = 'inventory'")
</template>

<script setup lang="ts">
// const displayStarterPack = computed(() => !fetchingLand.value && landData.value.length == 0)
// v-if="displayStarterPack == true" .svg-shadow-yellow v-else="build"

const displayTools = ref(false)
onMounted(() => setTimeout(() => displayTools.value = true, 150))
const { activateBuildMenu, activateOverviewMenu } = useBuildTools()

const gameMenu = useGameMenu()
</script>

<style>
.svg-shadow-yellow path {
  fill: var(--mc-yellow);
}

.svg-shadow-yellow {
  box-shadow: 0 0 0 var(--mc-yellow_20);

  will-change: filter;

  filter: drop-shadow(0px 0px 10px rgba(246, 186, 30, 0.9));

  animation: pulse 1.7s 1.3s infinite ease-in-out;
}

@keyframes pulse {
  to {
    filter: drop-shadow(0px 0px 2px rgba(246, 185, 30, 0.549));
  }
}
</style>
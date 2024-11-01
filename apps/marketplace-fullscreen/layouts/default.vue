<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="100vh")
  Header(:auto-close="true")
    template(#dropdown)
      NuxtLink(to="/account")
        HeaderSubmenuButton(b="t-1 b-1 gray-400") {{ $t(`general.navigation.menu.account`)}}

  VList(flex-grow="1" justify="top")
    PageHeader(v-if="!onLogin")

    Cart()

    //- Used for teleports
    div(id="overlays" select="none")

    VList(pos="relative" flex-grow="1")
      slot
      
</template>

<script lang="ts" setup>
const route = useRoute();
const onLogin = computed(
  () => route.name == "connect" || route.name == "logout",
);
</script>

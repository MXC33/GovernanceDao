<template lang="pug">
HList(text="white on-inactive:white opacity-60" items="center" justify="between" w="full" py="2" :inactive="isSoundEnabled") 
  div(v-html="$t(`general.navigation.settings.sound`)") 
  HelperCheckbox(type="checkbox" v-model="isSoundEnabled" h="4" w="8")
</template>

<script setup lang="ts">
const { isSoundEnabled } = useSoundSettings()
</script>
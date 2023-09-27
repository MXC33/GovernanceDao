<template lang="pug">
div.lang-dropdown(flex="~" p="4" justify="center")
  select(v-model="$i18n.locale")
    option(v-for="lang in $i18n.availableLocales" :key="lang" :value="lang") {{lang}}

</template>

<script lang="ts" setup>

</script>

<style>

</style>

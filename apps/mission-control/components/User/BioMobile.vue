<template lang="pug">
div(flex-center="col" p="x-15")
  div(flex="~ row" space-x="5" v-if="currentPage == 1")
    UserImage
    UserInfo
  UserShowcase(v-else mt="-5")

  div(flex-center="row" space-x="2" pos="absolute bottom-0")
    IconSlideDot(:pageNum="1" :currentPage="currentPage"  @click="currentPage = 1")
    IconSlideDot(:pageNum="2" :currentPage="currentPage"  @click="currentPage = 2")
</template>

<script setup>
const currentPage = ref(1)
</script>

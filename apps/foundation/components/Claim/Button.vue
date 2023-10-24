<template lang="pug">
HList()
  TitleDetail()
    template(#detail)
      PageParagraphs(:section="currentSection")
    template(#default) 0
      // img(src="~/assets/images/token.svg")
  button(btn="~ primary-outline" disable="active") {{ currentButtonText }}
  </template>
  
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentSection = computed(() => {
  if (route.path === '/') {
    return 'claimRewards';
  } else if (route.path === '/metashare') {
    return 'TotalRewards';
  }
});

const currentButtonText = computed(() => {
  if (route.path === '/metashare') {
    return 'CLAIM REWARDS';
  } else if (route.path === '/') {
    return 'CLAIM ALL';
  }
});

</script>
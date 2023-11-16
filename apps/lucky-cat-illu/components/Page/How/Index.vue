<template lang="pug">
PageWrapper(page="how")
  div.gradient(pos="absolute top-0 left-0 right-0" h="30")

  PageWrapperContent(space-y="12" justify="center" )
    h3(text="4xl pink" font="bdra") {{ $t('how.title') }}
    PageHowItem(v-for="item in items" :item="item") 

</template>

<script lang="ts" setup>
const items = ["step1", "step2", "step3", "step4"]
</script>

<style>
.gradient {
  background: linear-gradient(180deg, rgba(255, 30, 110, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>
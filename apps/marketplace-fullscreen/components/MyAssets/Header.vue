<template lang="pug">
VList(space-y="8")

  div(w="60")
    slot(name="collectionImage")
      img(src="~/assets/testfiles/test-collection-bg.png" w="60")

  HList(items="center" space-x="2")
    span(color="gray-50" font="bold" text="3xl")
      slot(name="header")

  HList(w="full")
    slot(name="attributes")



</template>

<script lang="ts" setup>
</script>

<style>
.graidentCollection {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 50%, rgba(203, 0, 16, 1) 100%);
}
</style>
<template lang="pug">
div()

  HeaderTitle(:index="9")
div(class="DIVENSMORSA")
  CorporationBox()
  CorporationBox()
  CorporationBox()
  CorporationBox()


</template>

<script lang="ts" setup>

</script>

<style>
.DIVENSMORSA {
  margin: 24px 0px;
  display: flex;
  gap: 48px 24px;
  flex-wrap: wrap;
}
</style>
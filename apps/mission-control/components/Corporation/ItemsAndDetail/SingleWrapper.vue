<template lang="pug">
CorporationBorderBox(title="Details" cut="top-right s-lg b-$mc-accent")
  slot()

  template(#outsideScroll)
    CorporationCartWrapper()
      slot(name="cart")

</template>

<script lang="ts" setup>
</script>
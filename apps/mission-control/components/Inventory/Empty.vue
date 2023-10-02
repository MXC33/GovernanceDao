<template lang="pug">
div(text="mc-orange") {{$t(`inventory.info.soSorry.sorry`)}} {{ activeInventoryTab }} {{$t(`inventory.info.soSorry.sorryNoItem`)}}
</template>

<script setup lang="ts">
const { activeInventoryTab } = useInventory()
</script>
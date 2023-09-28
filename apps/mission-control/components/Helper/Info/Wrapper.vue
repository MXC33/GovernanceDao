<template lang="pug">
HelperInfoBox(@mouseenter="onMouseEnter" @mouseleave="onMouseLeave")
  template(#info)
    HelperInfoTitle(v-if="isHovered == true" opacity="on-active:100 0 on-hover:100" transition="opacity" :hover="isHovered")
      template(#text-info)
        HList()
          slot(name="info-here")
</template>

<script lang="ts" setup>
const isHovered = ref(false)

const onMouseEnter = () => {
  isHovered.value = true
}

const onMouseLeave = () => {
  isHovered.value = false
}

</script>
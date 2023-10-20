<template lang="pug">
div(flex-grow="1")
  HList()
    Card()
      TitleDetail()
        template(#default)
          PageSection(section="EarnAndGive")
      template(#detailRight)
        NeedIcon(w="25" class="ml-2")
</template>

<script lang="ts" setup>
import NeedIcon from '~/assets/images/need.svg'
</script>
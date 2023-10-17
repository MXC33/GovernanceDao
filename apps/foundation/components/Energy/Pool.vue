<template lang="pug">
PageSection(section="pool")
  HList(grid="~ gap-6")
    Card(w="fit")
      div(class="imgBox" w="stretch" bg="black" p=6)
        IXTIcon(w="25")
      TitleDetail()
        PageSection(section="pool.options.earnIXT")

    Card(w="fit")
      div(class="imgBox" w="stretch" bg="black" p=6)
        NeedIcon(w="25" class="ml-2")
      TitleDetail()
        PageSection(section="pool.options.earnAndGive")
</template>

<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'
import NeedIcon from '~/assets/images/need.svg'

</script>

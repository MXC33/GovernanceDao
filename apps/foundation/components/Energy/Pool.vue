<template lang="pug">
PageSection(section="pool")
  div(grid="~ cols-2" gap="6")
    Card()
      TitleDetail()
        template(#normal)
          PageSection(section="pool.options.earnIXT")
      template(#detailRight)
        IXTIcon(w="25" class="ml-2")
    Card()
      TitleDetail()
        template(#normal)
          PageSection(section="pool.options.earnAndGive")
      template(#detailRight )
        NeedIcon(w="25" class="ml-2")
</template>

<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'
import NeedIcon from '~/assets/images/need.svg'

</script>

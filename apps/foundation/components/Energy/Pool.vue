<template lang="pug">
div()
  HList()
    Card()
      TitleDetail()
        template(#default)
          PageSection(section="pool.options.earnIXT")
      template(#detailRight)
        IXTIcon(w="25" class="ml-2")
</template>

<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'

</script>

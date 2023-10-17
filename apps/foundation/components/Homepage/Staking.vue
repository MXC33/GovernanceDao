<template lang="pug">
PageSection(section="earnStaking")
  div(grid="~ cols-2" gap="6")
    Card()
      TitleDetail()
        PageSection(section="ixtStakingInfo")
      template(#detailRight)
        IXTIcon(w="25" class="ml-2")

    Card()
      TitleDetail()
        PageSection(section="lpStakingInfo")
      template(#detailRight )
        UsdtIXT_Icon(w="25" class="ml-2")
        MaticIXT_Icon(w="25" class="ml-2")
</template>

<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'
import UsdtIXT_Icon from '~/assets/images/usdt_ix.svg'
import MaticIXT_Icon from '~/assets/images/matic_ix.svg'

</script>
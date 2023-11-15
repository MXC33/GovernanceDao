<template lang="pug">
div(grid="~ md:cols-2" gap="6")
  HomepageStakingEarnItem()
    template(#title) {{ $t('index.ixtStakingInfo.title') }}
    template(#description) {{ $t('index.ixtStakingInfo.description') }}
    template(#icons): IXTIcon(w="25")

  HomepageStakingEarnItem()
    template(#title) {{ $t('index.lpStakingInfo.title') }}
    template(#description) {{ $t('index.lpStakingInfo.description') }}
    template(#icons)
      UsdtIXT_Icon(w="25")
      MaticIXT_Icon(w="25")

</template>

<script lang="ts" setup>
import IXTIcon from '~/assets/images/token.svg'
import UsdtIXT_Icon from '~/assets/images/usdt_ix.svg'
import MaticIXT_Icon from '~/assets/images/matic_ix.svg'
</script>
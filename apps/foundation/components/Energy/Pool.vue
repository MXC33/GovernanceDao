<template lang="pug">
Card()
  VList(space-y="3")
    CardTitle() {{ $t(`energy.${id}.title`) }}
    div(color="gray-300" text="sm") {{ $t(`energy.${id}.description`) }}
  template(#detailRight)
    IXTIcon(w="25" class="ml-2" v-if="id=='energy'")
    NeedIcon(w="25" class="ml-2" v-else)
</template>

<script lang="ts" setup>
defineProps<{
  id: string
}>()

import NeedIcon from '~/assets/images/need.svg'
import IXTIcon from '~/assets/images/token.svg'

</script>

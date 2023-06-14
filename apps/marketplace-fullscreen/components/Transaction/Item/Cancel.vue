<template lang="pug">
VList(bg="gray-800" v-if="token" frame="~" flex-shrink="0")
  HList(justify="start"  cursor="pointer" p="l-3 r-6" items="center")
    VList(w="30" h="30" pos="relative" min-h="0")
      TokenImage(:token="token")

    VList(w="full" p="y-6 x-3")
      HList(space-x="3" font="bold")
        TokenName(:token="token" w="auto")

      slot(name="detail")

</template>
  
<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

defineProps<{
  token: IXToken
}>()

</script>
  
<template lang="pug">
div(p="b-6")
  div(flex width="6" v-if="status")
    CkeckedIcon(w-6 m="r-3" )
    p(text="base") IXT

  div(flex="~ col" width="6" v-else)
    div(flex m="b-2")
      WarningIcon(w-6 m="r-3")
      p(text="base") Territory
    div(text="base" color="$mc-warning")
      slot(name="warning")
      span(underline m="l-1")
        slot(name="nest")

</template>

<script lang="ts" setup>
import CkeckedIcon from '~/assets/icons/checked.svg'
import WarningIcon from '~/assets/icons/warning.svg'
defineProps<{
  status: boolean
}>()
</script>

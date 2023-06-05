<template lang="pug">
Popup(@close="onClose" :disable-default-close="true")
  template(#icon)
    WarningIcon(w="6" h="6")

  template(#header) {{error.title}}

  template(#default)
    VList()
      p {{ error.description }}
      div(color="semantic-warning" max-h="30" overflow-y="auto" p="3" bg="black opacity-20") {{ error.serverError }}

    VList(v-if="error.items")
      TokenImage(:token="token" v-for="token in error.items" )

  template(#buttons)
    button(@click="onClick" btn="~ primary") Ok 

</template>
  
  
<script lang="ts" setup>
import WarningIcon from '~/assets/icons/warning.svg'
import type { ContractError } from '@ix/base/composables/Utils/useContractErrors'

const { markAllNotificationsRead } = useContractErrors()

defineProps<{
  error: ContractError
}>()

const onClose = () => {
  markAllNotificationsRead()
}

const onClick = () => {
  markAllNotificationsRead()
}

</script>
  
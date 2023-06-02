<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) Error

  template(#default)
    VList()
      p {{ error.description }}
      p {{ error.serverError }}

    VList(v-if="error.items")
      TokenImage(:token="token" v-for="token in error.items" )

  template(#buttons)
    button(@click="onClick" btn="~ primary") Ok 

</template>
  
  
<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { ContractError } from '@ix/base/composables/Utils/useContractErrors'

const { markAllNotificationsRead } = useContractErrors()

defineProps<{
  error: ContractError
}>()

const onClick = () => {
  markAllNotificationsRead()
}

</script>
  
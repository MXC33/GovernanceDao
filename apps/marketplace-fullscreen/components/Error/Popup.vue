<template lang="pug">
Popup(@close="onClose" :disable-default-close="true")
  template(#icon)
    WarningIcon(w="6" h="6")

  template(#header) {{error.title}}

  template(#default)
    VList(space-y="3")
      VList(color="semantic-warning" v-if="error.description") {{ error.description }}

      VList(v-if="items && items.length > 0" flex-shrink="0" space-y="3")
        HList(v-for="item in items" frame="~" items="center" space-x="3")
          TokenImage(:token="item.token" h="25" w="25")

          VList()
            TokenName(:token="item.token" font="bold")
            HList(space-x="3")
              div(font="bold") {{ item.sale?.price }} IXT
              div(text="gray-300") ${{ ixtToUSD(item.sale?.price ?? 0)  }}

      VList()
        h3(font="bold") Error log 
        div(color="semantic-warning" max-h="15" overflow-y="auto" bg="black opacity-60" px="3") {{ error.serverError }}



  template(#buttons)
    button(@click="onClick" btn="~ primary") Ok 

</template>
  
  
<script lang="ts" setup>
import WarningIcon from '~/assets/icons/warning.svg'
import type { ContractError } from '@ix/base/composables/Utils/useContractErrors'
import { get } from '@vueuse/core'
const { markAllNotificationsRead } = useContractErrors()
const { ixtToUSD } = useIXTPrice()
const { error } = defineProps<{
  error: ContractError
}>()

const items = computed(() => error.items && get(error.items))

const onClose = () => {
  markAllNotificationsRead()
}

const onClick = () => {
  markAllNotificationsRead()
}

</script>
  
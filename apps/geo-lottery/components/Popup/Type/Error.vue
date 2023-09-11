<template lang="pug">
Popup(:hideCloseButton="true" :isError="true")
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Error

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6" )

      VList( v-if="error.description") {{ error.description }}

      VList(v-else)
        div(bg="black opacity-60" p="3" )
          div(color="semantic-warning" max-h="34" overflow-y="auto") {{ errorParsed }}

  template(#footer)
    ButtonItem(:value="'red'" min-w="300px md:350px"  :text="'CLOSE'" @click="onClose")

</template>
<script lang="ts" setup>
import type { ContractError } from '@ix/base/composables/Utils/useContractErrors'
import { get } from '@vueuse/core'
const { markAllNotificationsRead } = useContractErrors()
const { error } = defineProps<{
  error: ContractError
}>()

const items = computed(() => error.items && get(error.items))

const errorParsed = computed(() => {
  console.log('fisky error.serverError', error.serverError)
  if (!error || !error.serverError) return ''

  const e = error.serverError.toString()
  const message = e.substring(e.indexOf("{") , e.lastIndexOf("}")+ 1);
  let res = error.serverError
  try {
    res = JSON.parse(message)
  } catch (e) {}

  return res
})

const onClose = () => {
  markAllNotificationsRead()
}

const onClick = () => {
  markAllNotificationsRead()
}
</script>

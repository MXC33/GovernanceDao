<template lang="pug">
Popup()
  template(#header) PURCHASE TICKETS

  template(#default)
    VList(space-Y="4" pos="relative")
      HList(space-x="3" pos="relative")
        p() Choose method
        HelperHover(tooltip-id="Choose method Info tooltip")
          InfoIcon(w="5")

      InputRadio(v-model="radioTestModel" value="1")
        template(#default) One-time entry
        template(#info) 0 entries out of 20
      InputRadio(v-model="radioTestModel" value="2")
        template(#default) Subscription
        template(#info) 0 entries out of 30


  template(#footer)
    VList()
      Button(:value="'pink'" w="full") CONTINUE

</template>
<script lang="ts" setup>

import InfoIcon from '~/assets/icons/info.svg'

const { closeActivePopup } = usePopups()

const radioTestModel = ref(1)

const onClickAssets = () => {
  navigateTo('/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>

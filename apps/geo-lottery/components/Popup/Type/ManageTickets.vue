<template lang="pug">
Popup()
  template(#header) Manage Tickets

  template(#default)
    VList(space-Y="4" pos="relative")
      HList(space-x="3" pos="relative")
        p() Your one-time entries
        CirclePlusIcon(w="5")


  template(#footer)
    VList()
      Button(:value="'pink'" w="full") CONTINUE

</template>
<script lang="ts" setup>
import CirclePlusIcon from '~/assets/icons/circle-plus.svg'

const { closeActivePopup } = usePopups()

const radioTestModel = ref(1)

const onClickAssets = () => {
  navigateTo('/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>

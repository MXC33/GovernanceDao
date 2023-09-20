<template lang="pug">
HList(items="center" space-x="1 lg:2" font="bold" )

  HList(cursor="pointer" font="bold" gap="2")
    div(uppercase="~" color="gray_light") IXT:

    HelperIncrementingNumber(:value="value", :decimals="decimalCount" items="center" :color="resourceTextColor" :text-shadow="resourceTextColor")

    ClientOnly
      ButtonSound(sound="sm" transition="all" cursor="pointer" flex="~ row" rounded="full" bg="mc-orange" justify="center" items="center" aspect="square" p="0.5" min-w="0" w="5")
        PlusIcon.plus-black(w="full" min-w="0")

</template>

<script setup lang="ts">
import type { UserResource } from '~~/composables/useUserData';
import PlusIcon from '~~/assets/images/ui/icons/plus.svg'

const { ixtBalance } = useCurrencyData()

const decimalCount = computed(() => {
  switch (props.type) {
    case 'ixt':
      return 2
  }
})

const props = defineProps<{
  type: UserResource,
  hideNumber?: boolean
}>()

const resourceTextColor = computed(() => {
  switch (props.type) {
    case 'ixt': return 'mc-mint'
  }
})

const value = computed(() => {
  switch (props.type) {
    case 'ixt': return ixtBalance.value
  }
})

</script>

<style>
.plus-black path {
  fill: black
}
</style>


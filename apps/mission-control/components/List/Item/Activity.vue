<template lang="pug">
div(flex-start="row" items="center" space-x="2" text="on-active:(mc-mint opacity-100) white opacity-50" :active="isActive")

  div(w="1" h="1" aspect="square" bg="white on-active:mc-mint opacity-50" :active="isActive")

  div() {{ !isActive ? 'INACTIVE' : 'ACTIVE' }}

  IconDeleteItem(v-if="canEdit" @click="$emit('removeItem')" icon-button="~" w="4" h="4" translate-y="-0.5")

</template>


<script lang="ts" setup>
import IconDeleteItem from '~/assets/images/ui/build/delete-item.svg'

defineEmits(["removeItem"])

defineProps<{
  isActive: boolean,
  canEdit: boolean
}>()

</script>
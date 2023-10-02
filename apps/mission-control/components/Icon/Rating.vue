<template lang="pug">
div(flex="~ row wrap")
  div(v-for="item in ratingNumber")
    FilledIcon(w="3" h="full" object="contain")
  div(v-for="item in remain")
    StarIcon(w="3" h="full" object="contain")
</template>

<script lang="ts" setup>
import StarIcon from '~/assets/images/ui/star.svg'
import FilledIcon from '~/assets/images/ui/star-filled.svg'

const props = defineProps<{
  rating: string
}>()

const ratingNumber = computed(() => +(props.rating).replace(' Star', ''))
const remain = computed(() => 6 - ratingNumber.value)
</script>
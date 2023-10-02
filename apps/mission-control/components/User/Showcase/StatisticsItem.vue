<template lang="pug">
div(grid="~ cols-16" w="full" align="left" items="start")
  IconStatistics(:icon="props.title" grid="col-span-2 lg:col-span-1")
  div(flex="~ row" items="center" grid="col-span-10 lg:col-span-12" p="2" border="1 mc-orange_20" bg="mc-orange_10")
    p(text="xs mc-white_80") {{ strConvertor(props.title) }}
    //- div(@click="isActive = !isActive")
    //-   HeartIcon(w="4" v-if="!isActive")
    //-   HeartActiveIcon(w="4" v-else)
  p(ml="1" grid="col-span-4 lg:col-span-3" p="2" text="xs mc-orange" border="1 mc-orange_20" bg="mc-orange_10") {{ numConvertor(props.value) }}
</template>

<script lang="ts" setup>
import HeartIcon from '~/assets/images/ui/user/icon-heart.svg'
import HeartActiveIcon from '~/assets/images/ui/user/icon-heart-active.svg'

const isActive = ref(false)

const numConvertor = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const strConvertor = (string) => string.replace(/_/g, " ")

const props = defineProps<{
  title: string,
  value: number
}>()

</script>

<template lang="pug">
div(flex="~ row" bg="mc-orange_10" text="white" border="1 mc-orange_20" p="4" space-x="2" rounded="lg" uppercase="~")
  img(:src="Icon" w="10" h="full")
  div(flex="~ col")
    p(text-shadow="lg white")  {{ props.tier }} {{ props.type }}
    p(text="xs") {{ formatId }}

</template>

<script setup lang="ts">
import Icon from '~/assets/images/ui/user/cosmetics/icon-drone.png'

const formatId = computed(() => props.id.replace(/NFT - +/g, '').slice(0, -4))

const props = defineProps<{
  type: string,
  tier: string,
  id: string
}>()
</script>

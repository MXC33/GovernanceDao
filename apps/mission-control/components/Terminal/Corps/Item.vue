<template lang="pug">
ButtonSound(:sound="isDisabled ? 'none' : 'md'" @click="onClickLink" display="block" h="full" aspect="5/4" :pointer-events="isDisabled ? 'none' : ''")
  ClipPath(h="full" w="full" :is-disabled="isDisabled" :is-active="isClicked" cursor="pointer" opacity="on-disable:50" pos="relative" :disable="isDisabled")
    img(:src="config?.s3 + addCacheKey(imagePath)" object="cover" pos="absolute" inset="0")
</template>
      
<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';
const { clickLink, linkType } = useCorporationLinks()
const { addCacheKey } = useCacheKey()
const { public: config } = useRuntimeConfig()

const onClickLink = () => {
  isClicked.value = true
  clickLink(props.type)
}



const isDisabled = computed(() => linkType(props.type) == 'disabled')

const imagePath = computed(() => `/terminal/footer/${props.type}.png`)

const isClicked = ref(false)

const props = defineProps<{
  type: Corporation
}>()

</script>

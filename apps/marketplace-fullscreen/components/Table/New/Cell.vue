<template lang="pug">
HList(v-if="isMobile" pos="relative" text="md:ellipsis" bg="last:gray-900 group-hover:!gray-800 on-neutral:!gray-900" b="b-1 gray-600" min-h="80px on-neutral:auto" items="center" min-w="250px on-action:last:65px on-open:last:auto" max-w="full" w="full" p="r-4" :action="isButton" :open="isOpen" :neutral="isNeutral" justify="lt-md:last:end")
  slot()

HList(v-else text="md:ellipsis" bg="last:gray-900 group-hover:!gray-800" b="b-1 gray-600" min-h="80px" items="center" min-w="250px" max-w="full" w="full" p="r-6")
  slot()

</template>

<script lang="ts" setup>
const { isButton } = defineProps<{
  isButton?: boolean
  isOpen?: boolean
  isNeutral?: boolean
}>()

const { isMobile } = useDevice()
</script>
<template lang="pug">
div(pos="absolute lt-md:(right-0 bottom-0 left-0) md:(bottom-4 right-4)"  w="full" bg="black opacity-80" backdrop="~ blur-md" z="5 on-takeover:9" text="white" py="2" b="1 mc-mint_40" select="none" max-w="100" pointer-events="auto" :takeover="mobileTakeover ?? false")

  TitleWithPointer(b="b-1 mc-mint_40" p="x-4 y-2" translate-y="-2" :color="color ? color : 'mc-mint'") {{ title }}

  VList(p="4" items="left" space-y="2")
    slot

  div(grid="~ cols-2 gap-3" p="4")
    ButtonSound(btn="~ white" sound="md-x" @click="$emit('cancel')" uppercase="~") {{ cancelText ?? $t(`general.cancel`) }} 

    ButtonSound(btn="~ secondary" sound="md" @click="$emit('confirm')" pointer-events="on-inactive:none" opacity="on-inactive:50" uppercase="~" :inactive="disableConfirm") {{ confirmText ?? $t(`general.enter`)}}

</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  cancelText?: string,
  confirmText?: string,
  mobileTakeover?: boolean,
  disableConfirm?: boolean,
  color?: string
}>()

defineEmits(["cancel", "confirm"])
</script>
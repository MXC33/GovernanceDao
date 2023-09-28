<template lang="pug">
VList(flex-grow="lt-md:1" space-y="4" max-w="150" mx="auto" w="full" )
  VList(bg="md:$mc-accent-10" b="md:1 $mc-accent-40" flex-grow="1" min-h="0" cut="top-right b-$mc-accent-40")

    VList(b="b-1 $mc-accent-40" pos="sticky top-0")
      TitleWithPointer(p="x-4 y-2" color="$mc-accent" text="base" font="bold") {{ title }}

      HList(space-x="4" items="start" p="4" scrollable="all")
        SenderVideo(:sender="sender" type="square" w="20" b="1 $mc-accent-40")

        VList(text="white opacity-80 sm" leading="normal")
          slot

    VList(v-if="$slots.images" flex-grow="1" items="center" p="8" w="full" scrollable="all")
      slot(name="images")

  HList(justify="md:end between" space-x="2 md:4" p="x-2 y-4 md:0")
    ButtonSound(btn="~ white uppercase" @click="$emit('cancel')" w="lt-md:full" sound="sm-x" v-if="!useSecondary") {{$t(`general.cancel`)}}

    ButtonSound(btn="~ secondary-outline uppercase" @click="$emit('secondary')" w="lt-md:full" sound="sm" v-else) {{ secondaryText ?? $t(`general.continue`)}}

    ButtonSound(btn="~ secondary uppercase" @click="$emit('confirm')" w="lt-md:full" sound="sm") {{confirmText ?? $t(`general.confirm`)}}
</template>

<script setup lang="ts">
import type { Sender } from '~~/composables/useSender';

defineProps<{
  sender: Sender
  title: string,
  useSecondary?: boolean,
  confirmText?: string
  secondaryText?: string,
}>()
</script>

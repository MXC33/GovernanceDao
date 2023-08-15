<template lang="pug">
VList()
  VList(overflow-y="auto" h="full" pos="relative" bg="gray-900 on-neutral:gray-900" rounded="0.5" border="~" border-solid="~" border-gray-700="~")
    HList(h="12" px="6 on-small:8" items="center" pos="md:sticky top-0" flex-shrink="0" z="md:1" gap="2" @click.stop="dropDrawer" cursor="pointer" :small="isSmall" :neutral="isNeutral")
      VList(v-if="$slots.icon" w="6")
        slot(name="icon")
      VList(v-else-if="status" w="6")
        Checked(v-if="status == 'accept'")
        Decline(v-if="status == 'decline'")

      VList(color="white" flex-grow="1" text="md")
        slot(name="header")

      IconChevron(w="4" :up="isOpen")

    //div(b="b-1 gray-600" v-if="isOpen")
    Transition(name="slide-top")
      Collapse(:when="isOpen" class="v-collapse" overflow-y="auto" )
        div(px="6" py="4" b="t-1 gray-700" bg="$mc-blacks")
          slot

  //div(b="b-1 gray-600" v-if="!isOpen")
</template>

<script lang="ts" setup>
import { Collapse } from 'vue-collapsed'
import Checked  from '~/assets/icons/checked.svg'
import Decline  from '~/assets/icons/decline.svg'

const { startOpen } = defineProps<{
  startOpen?: boolean
  isSmall?: boolean
  isNeutral?: boolean
  status?: string
}>()

const isOpen = shallowRef(startOpen)
const dropDrawer = () => { isOpen.value = !isOpen.value }

</script>


<style>
.v-collapse {
  transition: height 300ms cubic-bezier(0.33, 1, 0.68, 1);
}
</style>

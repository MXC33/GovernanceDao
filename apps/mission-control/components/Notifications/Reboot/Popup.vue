<template lang="pug">
VList(pos="sticky top-0" w="full md:110" z="9999" b="md:1 mc-mint_40" bg="black")
  HList(justify="end")
    div(bg="mc-gray" cut="bottom-right b-mc-mint_40" mx="-1px" mt="-1px")
      SenderVideo(:sender="'proxy-of-change'" type="wide")

  div(bg="black opacity-60" text="sm" p="b-10 md:b-0")
    div(overflow-y="auto" scrollbar="~ mc" py="4")
      VList(px="4" space-y="4")
        TitleWithPointer(color="mc-mint" px="1") {{ spaceCaseIt($t(`general.avatars.proxy`)) }}

        div(text="$mc-secondary" align="left") 
          div(text-shadow="white" color="mc-white" p="x-1 b-20 md:x-1 b-10" text="xs md:sm" v-html="$t(`reboot.message`)")

      HList(justify="around" px="4" gap="4")
        //- ButtonSound(btn="~ secondary-outline" sound="md-x" uppercase="~" @click="clickClose" w="full md:~ auto" px="8" text="xs md:sm" cut="bottom-right b-mc-mint") {{ $t(`reboot.laterBtn`) }}
        ButtonSound(btn="~ secondary" sound="md-x" uppercase="~" @click="clickReboot" w="full md:~ auto" px="8" text="xs md:sm" cut="bottom-right b-mc-mint") {{ $t(`reboot.rebootBtn`) }}

</template>

<script setup lang="ts">
import { spaceCaseIt } from 'case-it'
const { claimAndUnstakeAll, isClaimAndUnstakeOpen } = useClaimAndUnstakeAll()

const clickClose = () => {
  isClaimAndUnstakeOpen.value = null
}

const clickReboot = async () => {
  await claimAndUnstakeAll()
  isClaimAndUnstakeOpen.value = null
}
</script>
<template lang="pug">
div(pos="fixed bottom-0 right-0" flex="~ col grow" items="end" self="end" pr="3 lg:6" space-y="3" color="white" z="9999")
  transition(name="fade")
    div(v-if="display" flex="~ col grow" justify="center" items="end" bg="black opacity-80" p="5" shadow="xl" rounded="lg" space-y="1")
      PopupDebugButton(@click="logoutWallet()") reconnect
      PopupDebugButton(@click="activePopup = 'company-lucky-cat'") luckycat
      PopupDebugButton(@click="activePopup = 'company-eternalab'") eternaLab
      PopupDebugButton(@click="activePopup = 'company-global-waste'") global waste
      PopupDebugButton(@click="activePopup = 'company-newlands'") newlands
      PopupDebugButton(@click="activePopup = 'confirm-pix'") confirm pix
      PopupDebugButton(@click="activePopup = 'select-pix'") select pix
      PopupDebugButton(@click="activePopup = 'transaction'") transactionLoading
      PopupDebugButton(@click="createNotification") publicNoticePopup
      PopupDebugButton(@click="activePopup = 'cosmetics'") cosmeticsPopup
      div(font="bold" color="pink-100" pt="3") - PACKS -
      div(color="pink-300" space-y="3" flex="~ col" items="end") 
        PopupDebugButton(@click="openPack('cargo-drop')") cargodrop
        PopupDebugButton(@click="openPack('loot-crate')") loot-crate
        PopupDebugButton(@click="openPack('anniversary-pack', 'common')") anniversary-pack
        PopupDebugButton(@click="openPack('anniversary-pack', 'mystery')") mystery-box

  //- div(@click="display = !display" cursor="pointer" bg="black" rounded="lg" p="3" text="sm white hover:opacity-80" transition="all" uppercase="~") {{ display ? 'Close debug' : 'Open debug' }}
</template>

<script setup lang="ts">
import type { TierId } from '~~/composables/NFTs/tiers';
import type { TreasureChestId } from '~~/composables/useOpenPacks';
const activePopup = usePopups()
const { addNotification } = useNotifications()
const { logoutWallet } = useWallet()
const display = ref(false)

const createNotification = () => {
  addNotification("Hello AOC #8494, you can now collect your waste by clicking on them and after then mint it or send it to the postmaster")
}

const openPack = (pack: TreasureChestId, tier?: TierId) => {
  // openGravityGradeChest(pack, tier)
}
</script>

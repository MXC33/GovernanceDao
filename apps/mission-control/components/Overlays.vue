<template lang="pug">
ClientOnly()
  transition(name="fade-slow")
    WalletPayments(v-if="popup == 'payments'")

  Notifications()

  PopupWrapper(v-if="currentPack")
    OpenPack(:pack="currentPack")

  //- PopupWrapper(v-if="isPendingTransaction")
  //-   WalletSigning(:title="title")
  //-     template(v-slot:description) {{ description }}

  PopupWrapper(v-if="isPendingTransaction")
    InfoImageLoadingTips(:title="title")
      template(v-slot:description) {{ description }}

  Transition(name="fade-slow")
    PopupWrapper(v-if="activePopup")
      PopupToken(:popup="activePopup")

  GameSettings()

</template>

<script lang="ts" setup>
const { currentPack } = useOpenPacks()
const { activePopup } = usePopupToken()
const popup = usePopups()
const { isPendingTransaction, transactionState } = useTransactions()
const { t } = useI18n()

const title = computed(() => {
  if (transactionState.value == 'extracting')
    return t('minting.extractingAssets')
  return t(`wallet.${transactionState.value}.title`)
})

const description = computed(() => {
  if (transactionState.value == 'extracting')
    return t('minting.extractingChest')
  return t(`wallet.${transactionState.value}.description`)
})
</script>
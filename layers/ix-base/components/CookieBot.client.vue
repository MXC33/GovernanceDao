<template lang="pug">
div#cookie-bot(ref="element")
</template>

<script lang="ts" setup>
const element = ref()

const { id } = defineProps<{
  id: string
}>()

useHead({
  script: [
    {
      src: "https://consent.cookiebot.com/uc.js",
      'data-cbid': id,
      'data-blockingmode': "auto",
      type: "text/javascript"
    },
    {
      src: `https://consent.cookiebot.com/${id}/cd.js`,
      type: "text/javascript"
    },
  ],
})

const consentState = useCookieConsentState()

const setupCookieBot = () => {
  const onCookiebotChanged = () => {
    console.log("Changed value", Cookiebot.consent)
    consentState.value = Cookiebot.consent
  }

  window.addEventListener('CookiebotOnAccept', onCookiebotChanged, false)
  window.addEventListener('CookiebotOnAccept', onCookiebotChanged, false)
  window.addEventListener('CookiebotOnDecline', onCookiebotChanged, false)
}

onMounted(() => {
  setupCookieBot()
})


</script>

<style>
#CybotCookiebotDialogPoweredbyCybot,
#CybotCookiebotDialogBodyContentTitle,
#CybotCookiebotDialogPoweredByText {
  display: none !important;
}

#CybotCookiebotDialog *,
#CybotCookiebotDialogBodyUnderlay * {
  font-family: 'Foundry Gridnik' !important;
}
</style>
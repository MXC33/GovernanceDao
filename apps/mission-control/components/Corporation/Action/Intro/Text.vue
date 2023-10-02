<template lang="pug">
HList(b="1 $mc-accent" scrollbar="md:(~ mc)" items="start" min-h="md:0")
  CorporationAvatar(:corporation="id" pos="sticky top-0")

  VList.corporation-intro(p="2 md:5")
    SenderName(text="$mc-accent" font="bold" uppercase="~" :id="id") 

    article.accent-article(v-html="description")
    div(h="6")

</template>

<script lang="ts" setup>
const { useMobileBreakpoint } = useDevice()
const id = useActiveCorporation()
const { corporationRouteI18n } = useCorporationRoute()
const isMobile = useMobileBreakpoint()
const description = computed(() => isMobile.value && mobileDescription.value ? mobileDescription.value : defaultDescription.value)
const { t } = useI18n()
const mobileDescription = computed(() => t(`corporations.${corporationRouteI18n.value}.descriptionMobile`))
const defaultDescription = computed(() => t(`corporations.${corporationRouteI18n.value}.description`))
</script>

<style lang="css">
.corporation-intro h3 {
  color: var(--mc-accent);
  font-weight: bold;
}

article strong {
  color: var(--mc-accent);
  font-weight: 400;
}

.accent-article span {
  color: var(--mc-accent);
}

.accent-article strong {
  color: var(--mc-accent)
}
</style>
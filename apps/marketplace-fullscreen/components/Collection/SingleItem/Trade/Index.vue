<template lang="pug">
DefineListing()
  CollectionSingleItemTradeListings(:item="item")

DefineOffers()
  CollectionSingleItemTradeOffers(:item="item")

DefineDetails()
  CollectionSingleItemMetaList(:item="item")

VList(space-y="6")
  CollectionSingleItemHeader(:item="item" mt="4")

  AttributeList(:attributes="attributes" v-if="item")

  VList(mx="lt-md:-4" space-y="6")
    TradeModule(:item="item")

    CollectionSingleItemTabs(v-if="isMobile" @tab-clicked="scrollToBottom")
      template(#activeTab="{tab}")
        ReuseListing(v-if="tab == 'listings'")
        ReuseOffers(v-else-if="tab == 'offers'")
        ReuseDetails(v-else-if="tab == 'details'")
        HList(v-else-if="tab == 'item-activity'" h="10" justify="center" items="center" font="bold italic" w="full")
          span() Coming soon

    template(v-else)
      ReuseListing()
      ReuseOffers()

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken'

const [DefineListing, ReuseListing] = createReusableTemplate()
const [DefineOffers, ReuseOffers] = createReusableTemplate()
const [DefineDetails, ReuseDetails] = createReusableTemplate()

const { item } = defineProps<{
  item: SingleItemData
}>()

const { isMobile } = useDevice()

const { getSingleAttributes } = useDefaultAttributes()
const attributes = computed(() => getSingleAttributes(item))

const scrollToBottom = () => {
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, 300)
}

</script>

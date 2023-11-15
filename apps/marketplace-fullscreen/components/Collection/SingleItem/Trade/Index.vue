<template lang="pug">
DefineListing(v-slot="{inDrawer}")
  CollectionSingleItemTradeListings(:item="item" :has-drawer="inDrawer")

DefineOffers(v-slot="{inDrawer}")
  CollectionSingleItemTradeOffers(:item="item" :has-drawer="inDrawer")

DefinePriceHistory(v-slot="{inDrawer}")
  CollectionSingleItemTradePriceHistory(:item="item" :has-drawer="inDrawer")

VList(space-y="6")
  CollectionSingleItemHeader(:item="item" mt="4")

  AttributeList(:attributes="attributes" v-if="item")

  VList(mx="lt-md:-4" space-y="6")
    TradeModule(:item="item")

    CollectionSingleItemTabs(v-if="isMobile")
      template(#activeTab="{tab}")

        ReuseListing(v-if="tab == 'listings'" :in-drawer="false")

        ReuseOffers(v-else-if="tab == 'offers'" :in-drawer="false")

        ReusePriceHistory(v-else-if="tab == 'price-history'" :in-drawer="false")

        CollectionSingleItemMetaList(:item="item" v-else-if="tab == 'details'")

        HList(v-else-if="tab == 'item-activity'" h="10" justify="center" items="center" font="bold italic" w="full")
          span() Coming soon

    template(v-else)
      ReuseListing(:in-drawer="true")
      ReuseOffers(:in-drawer="true")
      ReusePriceHistory(:in-drawer="true")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken'

const [DefineListing, ReuseListing] = createReusableTemplate<{ inDrawer: boolean }>()
const [DefineOffers, ReuseOffers] = createReusableTemplate<{ inDrawer: boolean }>()
const [DefinePriceHistory, ReusePriceHistory] = createReusableTemplate<{ inDrawer: boolean }>()

const { item } = defineProps<{
  item: SingleItemData
}>()

const { isMobile } = useDevice()

const { getSingleAttributes } = useDefaultAttributes()
const attributes = computed(() => getSingleAttributes(item))

</script>

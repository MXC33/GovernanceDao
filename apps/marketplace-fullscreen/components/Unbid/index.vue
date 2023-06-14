<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.unbid.title`) }}

  template(#default)
    VList(v-if="item" p="y-3" frame="~" bg="gray-800") 
      HList()
        HList( w="full" space-x="3" space-y="3")
          TokenImage(:token="item" inset="0" w="25" h="25" object="contain center" :key="getTokenKey(item)" )
          VList()
            div(font="bold") {{getTokenName(item)}} 
    div(p="y-3") {{ $t(`marketplace.unbid.warningText`) }}

  template(#buttons)
    HList()
      button(btn="~ secondary" w="full" @click="cancelOnClick") {{ $t(`marketplace.unbid.cancel`) }}
      ButtonInteractive(btn="~ primary" w="full" @click.prevent="unbidOnClick" text="Remove bid" :loading="isLoading") 

</template>

<script lang="ts" setup>
import ListingIcon from '~/assets/icons/listing.svg'
import type { UnbidItem } from '~/composables/useBidding';

const isLoading = shallowRef(false)

const { getTokenKey, getTokenName } = useTokens()
const { closeActivePopup } = usePopups()
const { removeBid } = useBidsAPI()
const { addError } = useContractErrors()
const { myAssetsURL } = useCollectionsURL()


const route = useRoute()
const { network, tokenId, contract } = route.params

const { item } = defineProps<{
  item: UnbidItem,
}>()

const { refresh: refreshSingleItem } = await useAssetAPI({
  contract: String(contract),
  network: String(network),
  tokenId: String(tokenId)
})

const { refresh: refreshMyAssets } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 2,
  }
})

const unbidOnClick = async () => {
  isLoading.value = true

  try {

    await removeBid(item._index, item.token_id, item.network, item.collection)
    await refreshSingleItem()
    await refreshMyAssets()

  } catch (err) {
    console.log("ERR", err)
    //@ts-ignore
    const message = err?.message

    addError({
      title: 'Error unbidding item',
      serverError: message
    })
  }
  isLoading.value = false

  closeActivePopup()
}

const cancelOnClick = async () => {
  closeActivePopup()
}



</script>
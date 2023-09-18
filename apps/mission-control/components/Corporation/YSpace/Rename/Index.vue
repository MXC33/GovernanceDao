<template lang="pug">
ClientOnly
  CorporationItemsAndDetail(list-title="Rovers" v-model="activeRenameItem" :list="availableItems" detail-title="")
    template(#noItems v-if="availableItems?.length == 0")
      HelperWarning(bg="mc-gray") No RVR's in inventory

    template(#list v-else)
      CorporationYSpaceRenameItem(v-for="item in availableItems" :item="item" v-model="activeRenameItem" :is-selected="isSelected(item)")

    template(#cartRight)
      CorporationCartRow(grid="")
        HList(p="2" space-x="2" items="center")
          TitleWithIcon(icon="pointer" color="$mc-accent" fill="$mc-accent" w="auto") {{ $t(`general.rename-title`) }}
          HelperTextField(w="full" font="bold" color="white" v-model="roverName" placeholder="Enter your name...")

      CorporationCartRow()
        CorporationCartSelectToken(:available-tokens="payTokens", v-model="payToken")

        HList(items="center" space-x="2" p="2" text="sm")
          div(w="full") {{ $t(`general.total`) }}

          HList(text="right $mc-accent" :with-name="true" flex-grow="1" space-x="2")
            div {{ renamePrice }}
            TokenName(:is-short="true" :key="payToken.token.tokenId" :token="payToken.token")

      CorporationCartRow()
        VList(items="center" justify="center") 
          div {{ $t(`general.one-time-purchase`) }}
        ButtonSound(grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" @click="onClickRename") {{ $t(`general.rename-title`) }}
        

</template>
  
<script lang="ts" setup>
import type { TokenWithInfoBlocks } from '~/composables/useInfoBlocks';


const { activeRenameItem, payToken, gotoCompleted, availableItems } = useCorporationRename()

const { setNameRoverIXT, setNameRoverAC } = useYSpaceContracts()
const { isSameNFT } = useNFTs()

const roverName = ref("")

const renamePrice = computed(() => getRoverRenamePrice(payToken.value))

const { astroCreditToken, ixtToken } = useCurrencyData()

const payTokens = computed(() => [astroCreditToken.value, ixtToken.value].filter(Boolean))


const isSelected = (item: TokenWithInfoBlocks) =>
  isSameNFT(activeRenameItem.value?.token, item.token)

const renameRover = async () => {
  if (payToken.value.token.tokenInfo.type == 'ixt')
    return await setNameRoverIXT(activeRenameItem.value?.token, roverName.value)
  else
    return await setNameRoverAC(activeRenameItem.value?.token, roverName.value)
}

const onClickRename = async () => {
  const renameStatus = await renameRover()
  if (renameStatus)
    gotoCompleted()
}


</script>
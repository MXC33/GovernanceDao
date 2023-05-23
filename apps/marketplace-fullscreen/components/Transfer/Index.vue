<template lang="pug">
VList(p="5" capitalized="~" space-y="5" b="~" rounded="2")
    //-items="center"
    VList(p="3") 
        div(text="2xl white" v-html="$t(`marketplaceFullscreen.transfer.title`)")
        HList(space-x="3")
            HList()
                TokenImage(:token="collectionData.nfts[0]" inset="0" w="15" h="15" object="contain center" :key="getTokenKey(collectionData.nfts[0])")
                VList()
                    div(text="white") {{getTokenName(collectionData.nfts[0])}} 
                    div(text="white") Collection name  
            div(flex="grow")
            div(text="white" v-html="$t(`marketplaceFullscreen.transfer.own`)")

    div(text="white") Quantity
    Adjustable(v-model="Image" h="10")

    //-VList(items="center" space-y="3")
    div(text="white") Wallet Adress
    input(text="2xl white center" bg="black" placeholder="e.g Dx0000" border="" v-model="wallet")
    div()
        div(text="white" v-html="$t(`marketplaceFullscreen.transfer.warningText`)")
    HList(space-x="3")
        FormCheckbox(v-model="isChecked") 
        div(text="white" v-html="$t(`marketplaceFullscreen.transfer.verifyText`)")

    button(m="auto" text="~" bg="gray-600" b="~" p="2" w="full" v-if="isChecked" @click="itemTransfer") Transfer Item 
</template>

<script lang="ts" setup>
import Image from "~/assets/icons/plus.svg"
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
import type { CollectionData } from '~/composables/useCollection';

const props = defineProps<{
    collectionData: CollectionData,
}>()

const { getTokenKey, getTokenName } = useTokens()
const { transferNFT } = useTransferNFT()

const wallet = ref("")
const isChecked = ref(false)



const itemTransfer = () => {
    console.log('transfering Item proccess starting')
    console.log(wallet.value)
    console.log(props.collectionData)
    if (props.collectionData.nfts[0].token_id == null)
        return console.log("ERROR, no token ID")
    transferNFT(props.collectionData.collection, wallet.value, props.collectionData.nfts[0].token_id, 1)

}
</script>
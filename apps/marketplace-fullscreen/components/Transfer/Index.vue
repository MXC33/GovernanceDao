<template lang="pug">
Popup(text="white")
    VList(p="5" capitalized="~" space-y="5" b="~" rounded="2")
        //-items="center"
        VList(p="3") 
<<<<<<< Updated upstream
            div(text="2xl white" v-html="$t(`mpFullscreen.transfer.title`)")
=======
            div(text="2xl" v-html="$t(`marketplaceFullscreen.transfer.title`)")
>>>>>>> Stashed changes
            HList(space-x="3")
                HList()
                    TokenImage(:token="collectionData.nfts[0]" inset="0" w="15" h="15" object="contain center" :key="getTokenKey(collectionData.nfts[0])")
                    VList()
                        div() {{getTokenName(collectionData.nfts[0])}} 
                        div() Collection name  
                div(flex="grow")
                VList(items="center")
<<<<<<< Updated upstream
                    div(text="white" v-html="$t(`mpFullscreen.transfer.own`)") 
                    div(text="white") 7          

        div(text="white" v-html="$t(`mpFullscreen.transfer.quantity`)")
        Adjustable(v-model="Image" h="10")
=======
                    div(v-html="$t(`marketplaceFullscreen.transfer.own`)") 
                    div() {{hardCodedMax}}          

        div() Quantity
        //-h="10"
        Adjustable(v-model="item" )
>>>>>>> Stashed changes

        //-VList(items="center" space-y="3")
        div() Wallet Adress
        input(text="2xl center" bg="black" placeholder="e.g Dx0000" border="" v-model="wallet" @input="onChange")
        div()
<<<<<<< Updated upstream
            div(text="white" v-html="$t(`mpFullscreen.transfer.warningText`)")
        Transition(name="slide-top")
            HList(space-x="3" v-if="wallet")
                FormCheckbox(v-model="isChecked") 
                div(text="white" v-html="$t(`mpFullscreen.transfer.verifyText`)")
=======
            div(v-html="$t(`marketplaceFullscreen.transfer.warningText`)")
        Transition(name="slide-top")
            HList(space-x="3" v-if="wallet")
                FormCheckbox(v-model="isChecked") 
                div(v-html="$t(`marketplaceFullscreen.transfer.verifyText`)")
>>>>>>> Stashed changes

        Transition(name="slide-top")
            button(m="auto" text="~" bg="gray-600" b="~" p="2" w="full" v-if="isChecked && wallet" @click="itemTransfer" v-html="$t(`mpFullscreen.transfer.transferItem`)")
</template>

<script lang="ts" setup>
import type { TransferItem } from '~/composables/useTransfer'
import Image from "~/assets/icons/plus.svg"
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
import type { CollectionData } from '~/composables/useCollection';
//import type { CartItem } from '~/composables/useCart'

//const item = defineModel<CartItem>()

const item = defineModel<TransferItem>()
const props = defineProps<{
    collectionData: CollectionData,
}>()

const { getTokenKey, getTokenName } = useTokens()
const { transferNFT } = useTransferNFT()

const wallet = ref("")
const oldWalletAdress = ref("")
const isChecked = ref(false)

const hardCodedMax = 10

const onChange = () => {
    if (wallet != oldWalletAdress) {
        isChecked.value = false;
        oldWalletAdress.value = wallet.value;
    }
}

const itemTransfer = () => {
    console.log('transfering Item proccess starting')
    console.log(wallet.value)
    console.log(props.collectionData)
    if (props.collectionData.nfts[0].token_id == null)
        return console.log("ERROR, no token ID")
    transferNFT(props.collectionData.collection, wallet.value, props.collectionData.nfts[0].token_id, 1)

}
</script>
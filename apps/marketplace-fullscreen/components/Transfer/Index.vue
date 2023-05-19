<template lang="pug">
div(text="2xl red") {{ $t(`marketplaceFullscreen.transfer.title`) }}
VList(items="center" p="3")
    div(text="red") {{ $t(`marketplaceFullscreen.transfer.quantity`) }}
    HelperAdjustable(text="2xl")
div(text="red") {{ $t(`marketplaceFullscreen.transfer.own1`) }} 26 {{ $t(`marketplaceFullscreen.transfer.own2`) }} 
VList(items="center" space-y="3")
    div(text="2xl red") {{ $t(`marketplaceFullscreen.transfer.walletAdress`) }}
    Input(text="xl red" bg="black" placeholder="Put Adress Here..." )
    button(rounded="1" text="2xl black" bg="red") {{ $t(`marketplaceFullscreen.transfer.confirm`) }}
</template>

<script setup lang="ts">
//const { t } = useI18n()

</script>
<template lang="pug">

VList(items="center" space-y="3" pb="6")
  div(grid="~ cols-7 md:gap-3 gap-1")
    ImageLink(href="https://app.uniswap.org/tokens/ethereum/0xf538296e7dd856af7044deec949489e2f25705bc")
      UniswapIcon(pos="absolute-center" w="60%")

    ImageLink(href="https://www.dextools.io/app/en/ether/pair-explorer/0x5beae44f1c4dfba15973081bf87cdf9411009a9b")
      DextIcon(pos="absolute-center" w="60%")

    ImageLink(href="https://etherscan.io/address/0xf538296e7dd856af7044deec949489e2f25705bc")
      EtherscanIcon(pos="absolute-center" w="60%")

    ImageLink(href="https://x.com/illumicati_eth")
      XIcon(pos="absolute-center" w="50%")

    ImageLink(href="https://www.coingecko.com/en/coins/illumicati")
      CoinGeckoIcon(pos="absolute-center" w="50%")

    ImageLink(href="https://t.me/IllumicatPortal")
      TelegramIcon(pos="absolute-center" w="60%")
    ImageLink(href="https://www.mexc.com/register?inviteCode=mexc-1tZeo")
      MexcIcon(pos="absolute-center" w="60%")

</template>
  
<script lang="ts" setup>
import UniswapIcon from "~/assets/icons/uniswap.svg"
import DextIcon from "~/assets/icons/dext.svg"
import XIcon from "~/assets/icons/x.svg"
import TelegramIcon from "~/assets/icons/telegram.svg"
import EtherscanIcon from "~/assets/icons/etherscan.svg"
import CoinGeckoIcon from "~/assets/icons/coingecko.svg"
import MexcIcon from "~/assets/icons/mexc.svg"


</script>
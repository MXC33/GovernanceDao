<template lang="pug">
PopupBlank()
  VList(w="full" h="full")
    img(src="~/assets/images/bg-you-win-img.png" inset="0" z="-1" h="auto" w="full" pos="absolute" top="0 md:50%" translate-y="-50%")
    VList(w="full" pos="relative" m="auto" z="1000" max-w="150" color="white" h="lt-md:full" max-h="md:90%" overflow-y="auto" overflow-x="lt-md:hidden")
      VList(flex-grow="1" p="4 md:6" items="center" gap-y="5" @click.stop="")
        h1(text="4xl md:6xl lg:8xl center" font="bdrA3mik" whitespace="pre-wrap") You Win
        div( w="450px" h="450px" mb="2")
          //iframe(:src="popup.nft_link"
          iframe(:src="'/lottery-ticket.svg'"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameborder="0"
            sandbox="allow-scripts"
            w="full" h="full")
        ButtonItem(:value="'pink'" w="auto sm:390px" :text="'Claim Now'" @click="onClaimReward()" :loading="isLoading")
        button(color="white" text="lg" @click="onClose" underline="~ offset-2") I’ll do this later

</template>
<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";
import type {PopupTypeYouWin} from "~/composables/usePopups";
const { closeActivePopup, displayPopup, popup } = usePopups()

const onClose = () => {
  closeActivePopup()
}

const {
  claimReward
} = useLottery()
const { loading: isLoading, execute: claimRewardRequest } = useContractRequest(() =>
  claimReward((popup.value as PopupTypeYouWin)?.lottery_id)
)

const onClaimReward = async () => {
  if (!popup.value) return
  const claimReward = await claimRewardRequest()

  if (claimReward)
    displayPopup({
      type: 'popup-type-you-claimed',
      nft_link: (popup.value as PopupTypeYouWin)?.nft_link
    })
}
</script>

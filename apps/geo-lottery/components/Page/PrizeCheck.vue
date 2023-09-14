<template lang="pug">
HList(flex="~ col lg:row" items="center" gap="0 lg:32")
  VList(flex="~ 1 col" space-y="6" justify="center" w="full" order="2 lg:1")
    div(pos="relative" h="0" p="b-100%")
      div(pos="absolute" inset="0")
        iframe(src="/lottery-ticket.svg"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameborder="0"
          sandbox="allow-scripts"
          w="full" h="full")

  div(flex="~ 1" items="center" order="1 lg:2")
    div(space-y="3 md:4" color="ix-white" font="bold" text="base sm:lg")
      div(color="ix-white" text="3xl md:4xl xl:5xl" uppercase="~" font="bdrA3mik") prize check
      p() Your payments for tickets and prize payouts are powered by our exclusive AGOLD token. AGOLD is not just any token; AGOLD provides a constant stream, similar to renting tiles in Mission Control. The magic? It's tied to a tradable NFT. Hold, transfer or sell this NFT, and the AGOLD immediately starts streaming to its new owner. The speed of your payout change depending on the size of the prize.
      ul(list="square" pl="8")
        li() Stream your winnings continually to your wallet
        li() Full ownership rights
        li() Fully tradable
</template>
<script lang="ts" setup>
</script>
<style>
</style>

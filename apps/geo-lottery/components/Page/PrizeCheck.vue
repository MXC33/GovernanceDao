<template lang="pug">
HList(flex="~ col lg:row" items="center" gap="12 lg:32")
  div(flex="~ 1" items="center")
    div(space-y="3 md:4")
      div(color="ix-white" text="4xl xl:5xl 2xl:6xl" uppercase="~" font="bdrA3mik") Prize Check
      p(color="ix-white" font="bold" text="base sm:lg") Streamable Dynamic NFTs Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate, ipsum in ultricies dictum, erat diam porttitor diam, quis pharetra sapien dui et massa. Lorem ipsum.
      ul(list="square" color="ix-white" font="bold" text="base sm:lg" pl="5")
        li() Stream your winnings continually to your wallet
        li() Full ownership rights
        li() Fully tradable
  VList(flex="~ 1 col" space-y="6" items="lg:end" justify="center" w="full")
    div() Link with svg for info
</template>
<script lang="ts" setup>
</script>
<style>
</style>

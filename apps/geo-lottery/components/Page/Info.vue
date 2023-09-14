<template lang="pug">
HList(flex="~ col lg:row" items="center" gap="12 lg:32")
  div(flex="~ 1" items="center")
    div(space-y="3 md:4")
      div(color="ix-white" text="3xl md:4xl xl:5xl" uppercase="~" font="bdrA3mik") How to play
      div(color="ix-white" font="bold" text="base sm:lg" space-y="2 md:6")
        p() To qualify for entering the Territory Lottery you simply need to own a Territory and purchase a lottery ticket. Every week, a Country, a Territory Tier and a Territory Size are randomly selected through a draw. To become a winner your Territory firstly needs to be located in the country drawn. Your winnings increase if your Territory also matches the Territory Tier drawn. If you, on top of Country and Tier, also hold the Territory size drawn your winnings increase even more. Each week equals a new chance to win!
        p() Common Prize <br/> Win by Country - The common prize pool is shared by players whose territory is located in the randomly selected country.
        p() Rare Prize <br/> Win by Country + Tier - The Rare price pool is shared by players whose territory is located in the randomly selected country and tier type.
        p() Legendary Prize <br/> Win by Country + Tier + Size - The Legendary prize pool is shared by players whose territory is located in the randomly selected country, tier type and size.
        p() Don’t own a territory?
      div(flex="~" justify="center sm:start")
        ButtonItem(:value="'pink'" min-w="full md:415px"  :text="'BUILD OR BUY YOUR OWN AT NETEMPIRE'")

  VList(flex="~ 1 col" space-y="6" items="center" justify="center" w="full")
    FramePinkWithImg()
      template(#title) COMMON PRIZE
      template(#subtitle) COUNTRY
      template(#content)
        img(src="~/assets/images/country-img-line.png")
    FramePinkWithImg()
      template(#title) RARE PRIZE
      template(#subtitle) COUNTRY <br> + TIER
      template(#content)
        TireHexagonColor(tier="Rare")
    FramePinkWithImg()
      template(#title) COMMON PRIZE
      template(#subtitle) COUNTRY <br> + TIER <br> + Size
      template(#content)
        TireSizeIcon(tier="Outlier" size="Domain")
</template>
<script lang="ts" setup>
</script>
<style>
</style>

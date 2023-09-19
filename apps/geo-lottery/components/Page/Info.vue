<template lang="pug">
HList(flex="~ col lg:row wrap" items="center" justify="between" gap-y="10")
  div(flex="~" grow="0" shrink="0" basis="100% lg:45%" items="center" order="1")
    div(space-y="3 md:4")
      div(color="ix-white" text="3xl md:4xl xl:5xl" uppercase="~" font="bdrA3mik") How to play
      div(color="ix-white" font="bold" text="base sm:lg" space-y="2 md:6")
        p() To enter the Territory Lottery you need to own a Territory and purchase tickets. Every week, a Country, a Tier and a Territory Size are randomly drawn. To win you firstly need a territory in the drawn country, see Common Prize below. If you also have the drawn tier (ie, Outlier, Common, Uncommon, Rare & Legendary) your winnings will increase. If you, on top of Country and Tier, also hold the Territory size (Area, Sector, Zone, Domain) drawn your winnings increase even more.
        p()
          span(underline  decoration="1") Common Prize
          span(font="normal")  - Greenland <br/>
          span() Win by Country - shared by players that have a territory located in the randomly selected country.
        p()
          span(underline  decoration="1") Rare Prize
          span(font="normal")  - Greenland + Rare <br/>
          span() Win by Country + Tier - shared by players that have a territory located in the randomly selected country and tier type.
        p()
          span(underline  decoration="1") Legendary Prize
          span(font="normal")  - Greenland + Rare + Zone <br/>
          span() Win by Country + Tier + Size - shared by players that have a territory located in the randomly selected country, territory tier and size.

  VList(flex="~ col" grow="0" shrink="0" basis="100% lg:45%" space-y="6" items="center" justify="center" w="full" order="3 lg:2")
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
        TireSizeIcon(tier="Rare" size="Zone")

  div(basis="100%" color="ix-white" font="bold" text="base sm:lg" space-y="2 md:6" order="2 lg:3")
    p() The prize amount depends on the number of tickets played and not on the Tier or Territory Size. You can enter despite your territory being staked on ix.foundation or Mission Control. If you acquire more territories during the week your chance of winning increases. If there is not a winner in a certain category the prize pool is pushed to the following week.Purchase your tickets, start your stream, sit back and hope to win!
    p() Get a Territory, join the action!
    div(flex="~" justify="center sm:start")
      ButtonItem(:value="'pink'" min-w="full md:415px" @click="goToNetempire" :text="'BUILD OR BUY YOUR OWN AT NETEMPIRE'")

</template>
<script lang="ts" setup>
const goToNetempire = ( ) => {
  return window.location.href = 'https://planetix.com/netempire'
}
</script>
<style>
</style>

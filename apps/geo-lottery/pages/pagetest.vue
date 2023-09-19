<template lang="pug">

VList(flex-grow="1" space-y="12" px="4 md:8" py="4 md:8" bg="$mc-pink" )

  //Back Frame Wave
  FrameWave(items="center" justify="center")
    template(#content)
      VList(items="center")
        div(px="8" max-w="80%")
          <svg w="full" h="full" object="contain center" width="354" height="35" viewBox="0 0 354 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.3002 34.4023H0L5.32211 25.1857H8.78809L18.3646 8.57593H14.9151L19.843 0H37.2221L32.2942 8.57593H29.0089L19.4488 25.1364H31.3086L34.5938 19.4684H44.0719L35.3002 34.4023Z" fill="#F9F9F9"/>
            <path d="M78.1899 28.7343C77.2256 30.3283 75.899 31.6723 74.3178 32.6571C72.7366 33.642 70.9454 34.2399 69.0898 34.4023H45.4359C42.1506 34.4023 41.1157 31.8887 42.9391 28.7343L59.5296 0H75.3975L70.4696 8.62522H66.1988L56.6057 25.2349H68.6627L78.2392 8.62522H74.0341L78.962 0H94.7148L78.1899 28.7343Z" fill="#F9F9F9"/>
            <path d="M113.557 18.4331H125.154L119.208 28.7341C118.25 30.3196 116.934 31.6583 115.365 32.6427C113.796 33.6271 112.018 34.2297 110.173 34.4021H85.8624C82.6592 34.4021 81.5423 31.8885 83.3656 28.7341L96.6874 5.73351C97.6382 4.14186 98.9528 2.79828 100.523 1.81303C102.094 0.827775 103.875 0.228897 105.722 0.0654907H130.033C133.187 0.0654907 134.353 2.57915 132.53 5.73351L127.29 14.8023H115.693L119.224 8.69071H106.576L96.983 25.3004H109.631L113.557 18.4331Z" fill="#F9F9F9"/>
            <path d="M137.657 28.1921L134.141 34.4023H120.885L126.175 25.2349H128.491L138.084 8.62522H135.784L140.712 0H153.968L150.354 6.25949L169.655 0.0493351H178.936L169.984 15.5747H160.538L162.641 11.9275L146.346 17.2011L156.563 22.4749L158.666 18.8277H168.095L159.109 34.4023H149.746L137.657 28.1921Z" fill="#F9F9F9"/>
            <path d="M221.203 0L216.275 8.62522H211.003L195.907 21.982L194.067 25.1857H198.206L192.884 34.4023H172.286L177.608 25.1857H181.78L183.571 22.0806L183.866 8.62522H178.183L183.111 0H195.512V11.681L208.982 0H221.203Z" fill="#F9F9F9"/>
            <path d="M250.292 18.4331H261.889L255.943 28.7341C254.987 30.3214 253.671 31.6614 252.102 32.646C250.532 33.6307 248.753 34.2322 246.908 34.4021H222.598C219.312 34.4021 218.277 31.8885 220.101 28.7341L233.422 5.73351C234.375 4.14362 235.69 2.80143 237.26 1.81643C238.83 0.831436 240.611 0.231487 242.457 0.0654907H266.768C269.922 0.0654907 271.088 2.57915 269.265 5.73351L264.025 14.8023H252.411L255.943 8.69071H243.295L233.702 25.3004H246.35L250.292 18.4331Z" fill="#F9F9F9"/>
            <path d="M281.255 34.4023L286.544 25.2349H274.652L269.346 34.4023H257.65L271.761 9.95601L283.555 4.83013L286.347 0H303.874L301.114 4.748L307.011 9.92312L292.901 34.3695L281.255 34.4023ZM292.096 15.624L288.236 11.8782L280.22 15.5747L278.742 18.1376H290.634L292.096 15.624Z" fill="#F9F9F9"/>
            <path d="M353.038 0L344.036 15.5747H334.542L338.583 8.57593H335.297L325.672 25.2349H328.957L323.668 34.4023H305.599L310.888 25.2349H314.305L323.914 8.57593H320.76L316.719 15.5747H307.274L316.259 0H353.038Z" fill="#F9F9F9"/>
          </svg>
        div(class="title-stroke" color="black"  text="4xl sm:7xl center stroke-$mc-pink" ) TERRA-LOTTERY



  //Back Frame Wave
  div(grid="~ md:cols-12" bg="black")
    div(col="start-2 span-10" p="x-4 sm:x-14 y-30" space-y="30")
      //How to Play Section
      HList(flex="~ col lg:row" items="center" gap="12 lg:32")
        div(flex="~ 1" items="center")
          div(space-y="4")
            div(color="ix-white" text="4xl xl:6xl" uppercase="~") how to play
            ul(list="square" color="ix-white" font="bold" text="lg" space-y="6" pl="5")
              li() Each week, a geolocation, size, and tier are randomly selected through a drawing. If you happen to own a territory that matches all three attributes, you become the winner of the jackpot!
              li() Pool 2 will be shared among all territory owners whose tier and geolocation match the draw. This means that even if your territory size doesn't match, you will still be a winner!
              li() Furthermore, owners of territories that only match the drawn geolocation will share the prizes from Pool 3!
            p(color="ix-white" font="bold" text="lg") Don’t own a territory?
            ButtonSound(sound="lg" btn="~ accent lg" color="white" text-shadow="none" cut="bottom-right s-md b-ix-primary") Get Your Own At Netempire

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

      //Prize Check
      HList(flex="~ col lg:row" items="center" gap="12 lg:32")
        div(flex="~ 1" items="center")
          div(space-y="4")
            div(color="ix-white" text="4xl xl:6xl" uppercase="~") Prize Check
            p(color="ix-white" font="bold" text="lg") Streamable Dynamic NFTs Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate, ipsum in ultricies dictum, erat diam porttitor diam, quis pharetra sapien dui et massa. Lorem ipsum.
            ul(list="square" color="ix-white" font="bold" text="lg" pl="5")
              li() Stream your winnings continually to your wallet
              li() Full ownership rights
              li() Fully tradable
        VList(flex="~ 1 col" space-y="6" items="lg:end" justify="center" w="full")
          div() Link with svg for info


      //Price & Pool Distribution
      div(grid="~ lg:cols-2" bg="black" space-y="30" )
        VList(col="span-1" flex="~ 1 col" justify="center lx:start" w="full")
          div(max-w="450px" text-left)
            RadialChart(:seriesChart="seriesRadial" :colorsChart="colorsRadial" titleChart="Price & Pool Distribution Chart")

        div(flex="~ 1" items="center" pl="2xl:42")
          div(space-y="4")
            div(color="ix-white" text="4xl xl:6xl" uppercase="~") Price & Pool Distribution
            p(color="ix-white" font="bold" text="lg") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate, ipsum in ultricies dictum, erat diam porttitor diam, quis pharetra sapien dui et massa. Lorem ipsum.

            InfoPercentWithColor(circleBG="#FF1E6E" :percent="15" info="LuckyCat Metashare")
            InfoPercentWithColor(circleBG="#FFAFCC" :percent="14" info="Territory staking")
            InfoPercentWithColor(circleBG="#FFFFFF" :percent="1" info="Astro Cap Metashare")
            InfoPercentWithColor(circleBG="#D862EB" :percent="10" info="Amelia Foundation")
            InfoPercentWithColor(circleBG="#7562EB" :percent="10" info="Burn")
            InfoPercentWithColor(circleBG="#41B2F2" :percent="16.67" info="Common prize: Country")
            InfoPercentWithColor(circleBG="#20DCBA" :percent="16.67" info="Rare prize: Country + Tier")
            InfoPercentWithColor(circleBG="#CEF2BD" :percent="16.67" info="Jackpot prize: Country + Tier + Territory")


//PopupTypePurchaseTickets()
//PopupTypeOneTimeEntry()
//PopupTypeOneTimeEntrySuccess(:hideCloseButton="true")
//PopupTypeSubscribe()
//PopupTypeSubscribeSuccess(:hideCloseButton="true")
//PopupTypeSwap()
PopupTypeSwapSuccess(:hideCloseButton="true")
//PopupTypeManageTickets()
//PopupTypeError(:hideCloseButton="true" :isError="true")



</template>
<script lang="ts" setup>
import RadialChart from "~/components/Chart/RadialChart.vue";
import OneTimeEntry from "~/components/Popup/Type/OneTimeEntry.vue";
import Popup from "~/components/Error/Popup.vue";
const colorsRadial = [ '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E',
  '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC',
  '#F9F9F9',
  '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD',
  '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA',
  '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2',
  '#7562EB', '#7562EB', '#7562EB', '#7562EB',
  '#D862EB', '#D862EB', '#D862EB', '#D862EB'];

const seriesRadial = [1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1]

const popUpYouWin = false;

useHead({
  title: "Home | Geo Lottery | PlanetIX"
})

definePageMeta({
  middleware: ''
})

</script>
<style>
.title-stroke {
  /*-webkit-text-stroke: 1px #FF1E6E;*/
  -webkit-text-stroke-width: 1px;
}

@media (min-width: 640px) {
  .title-stroke {
    /*-webkit-text-stroke: 3px #FF1E6E;*/
    -webkit-text-stroke-width: 3px;
  }
}
</style>

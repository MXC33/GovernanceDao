<template lang="pug">
VList(pos="sticky top-0" z="99" w="full")
  HList(items="center"  bg="gray-800" px="7.5" h="16")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")

    HList(space-x="8" px="8" items="center" font="bold" text="lg" flex-grow="1")
      HeaderLink(to="/" display="lt-md:none") buy ixt
      HeaderLink(to="/" display="lt-md:none") play now
      HeaderLink(to="/" display="lt-md:none") staking
      HeaderLink(to="/" display="lt-md:none") community

    HList(font="bold" space-x="6" px="6")
      HeaderLink(to="/" display="lt-md:none") help
      HeaderLink(to="/" display="lt-md:none")
        HelperLanguage(language="EN")

    HList(items="center" h="10" b="1 $mc-mint" color="$mc-mint" font="bold" bg="$mc-mint-20" px="8" display="lt-md:none") 2,234,128 IXT

      //- HeaderLink(to="/mission-control" display="lt-md:none") 
      //-   span(display="lt-lg:none") {{ $t(`general.navigation.missionCtrl`)}}
      //-   span(display="lg:none") {{ $t(`general.mc`) }}

      //- HeaderLink(to="#" @click="gotoIXPage('game')" display="lt-md:none") {{ $t(`general.navigation.netEmpire`)}}
      //- GameHeaderResourcesIxt(type="ixt" display="lt-md:none" @click="openLifiWidget")
      //- UserHeaderProfileAvatar(text="xs" cursor="default" h="6" w="6" v-if="user")
      //- HList(justify="end" w="full" flex-grow="1")
      //-   ButtonSound(sound="sm" opacity="50 on-enabled:100 hover:60" filter="grayscale on-enabled:none" transition="hover" @click="toggleSound" :enabled="isSoundEnabled")
      //-     IconSoundOn(w="6" v-if="isSoundEnabled")
      //-     IconSoundOff(w="6" v-else)


    ButtonSound(sound="sm" @click="toggleMenu" ml="!4" display="md:none")
      Hamburger(w="8" h="8" cursor="pointer" opacity="hover:50" transition="all")
      transition(name="slide-top")
        div(v-if="menuOpen" pos="fixed top-0 bottom-0 left-0 right-0" bg="black-800 opacity-20" backdrop="~ blur-md" z="100" cursor="pointer")

          VList(flex-grow="1" font="bold")
            HList(items="center" justify="between" bg="gray-800" py="2" px="4" h="16")
              HList(items="center" b="1 $mc-mint" color="$mc-mint" text="sm" bg="$mc-mint-20" px="4" py="1") 2,234,128 IXT
              HList(space-x="6")
                HeaderLink(to="/") help
                HeaderLink(to="/")
                  HelperLanguage(language="EN")

            VList(bg="black" w="full" h="100%" py="6" font="bold" text="lg" uppercase="~" px="6")
              VList(justify="start" items="start" space-y="12" py="4")
                HeaderLink(to="/") + buy ixt
                HeaderLink(to="/") + play now
                HeaderLink(to="/") + staking
                HeaderLink(to="/") + community

  HeaderDetails(  @clicked-On-DropDown-Item="onClicked" :categoryHeaderObject="mainHeaders")
  Popup(v-if="showIFrame")
    iframe(src="https://ix.foundation/lefi" w="full md:130" h="full md:115" )
</template>

<script lang="ts" setup>
import IconSoundOn from '~/assets/images/sound/sound-on.svg'
import IconSoundOff from '~/assets/images/sound/sound-off.svg'
import Hamburger from '~/assets/images/header/hamburger.svg'
import PlanetIX from '~/assets/images/header/planetix.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
import { CategoryHeaderObject } from '~/composables/useSiteHeader'

const mainHeaders : CategoryHeaderObject[] = [
  {
    title: "Buy IXT",
    subHeaders: [
      {
        title: "Swap",
        description: "Swap To IXT",
        image: "",
        link: ""
      }
    ]
  },
  {
    title: "Bridge",
    subHeaders: [
      {
        title: "Polygon",
        description: "Bridge tokens to Polygon blockchain",
        image: "",
        link: ""
      }
    ]
  },
  {
    title: "SUPPLY LIQUIDITY",
    subHeaders: [
      {
        title: "IXT/USDT (Quickswap)",
        description: "Secure IXT/USDT liquidity, earn 7% APR.",
        image: "",
        link: ""
      },
      {
        title: "IXT/MATIC (Sushiswap)",
        description: "Secure IXT/USDT liquidity, earn 4% APR.",
        image: "",
        link: ""
      }
    ]
  },
  {
    title: "LEND CAPITAL",
    subHeaders: [
      {
        title: "LEND CAPITAL",
        description: "Lend 100x IXT with USDT as collateral.",
        image: "",
        link: ""
      }
    ]
  }
]




// const subHeaders : HeaderObject[] = [
//   {
//     title: "Swap",
//     description: "Swap To IXT",
//     image: "",
//     link: "Swap To IXT"
//   },
//   {
//     title: "Swap",
//     description: "Swap To IXT",
//     image: "",
//     link: "Swap To IXT"
//   },
//   {
//     title: "Swap",
//     description: "Swap To IXT",
//     image: "",
//     link: "Swap To IXT"
//   },
//   {
//     title: "Swap",
//     description: "Swap To IXT",
//     image: "",
//     link: "Swap To IXT"
//   }
// ]

//const finalArr = [ t(mpFullscreen.titles), t(mpFullscreen.description), t(mpFullscreen.image), ]
const stringTitles = [
  /*[
    "Main Title", First is always the main title
    "sub titles",
    "sub titles",
    "sub titles",
  ]*/
  [
    "Swap", 
    "Swap To IXT",
  ], 
  [
    "Brige ",
    "Polygon",
  ], 
  [
    "Supply", 
    "IXT/USDT", 
    "IXT/MATIC"
  ], 
  [
    "Capital", 
    "Lend Capital",
  ],
]
const stringTitlesDetails = [
  ["Swap any crypto or fiat to ixt",], 
  ["Brige tokens to polygon blockchain"], 
  ["Secure IXT/USDT liquidity, earn 7% APR", "Secure IXT/MATIC liquidity, earn 7% APR"], 
  ["Lend 100x IXT with USDT as collateral",]
]

const { gotoIXPage } = useIXLinks()
const { user } = useUser()
const menuOpen = ref(false)
const { isSoundEnabled } = useSoundSettings()
const router = useRouter()


const showIFrame = ref(false)

const onClicked = (x: number, y: number) => {
  console.log(stringTitles[x][y])
  if(x == 0 && y == 1){
    console.log("In if")
    showIFrame.value = true
  }
  return goToPage(stringTitles[x][y])
}

const goToPage = (title:string) => {
  switch(title) {
    case 'Polygon':
      return window.location.href = 'https://dashboard.ix.foundation/'
  }
}
const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}


// const stringTitles = [
//   [
//     /*[
//       "Main Title", First is always the main title
//       "sub titles",
//       "sub titles",
//       "sub titles",
//     ]*/
//     [
//       "Swap", 
//       "Swap To IXT",
//     ], 
//     [
//       "Brige ",
//       "Polygon",
//     ], 
//     [
//       "Supply", 
//       "IXT/USDT", 
//       "IXT/MATIC"
//     ], 
//     [
//       "Capital", 
//       "Lend Capital",
//     ],
//   ],
//   [
//     [
//       "The Game", //
//       "Terminal", 
//       "Marketplace", 
//       "IX Arena", 
//       "Mission Control", 
//       "Gamebook",
//     ], 
//     [
//       "Claim & Burn",
//       "AOC Badge", 
//       "Avatar", 
//       "Arcade",
//     ], 
//     [
//       "Analytics", 
//       "Game Performance", 
//       "NFT Performance", 
//       "Vesting Schedule", 
//       "IXT Perfoamce", 
//       "Smart Contracts"
//     ], 
//   ],   
// ]

// const stringTitlesDetails = [
//   [
//     ["Swap any crypto or fiat to ixt",], 
//     ["Brige tokens to polygon blockchain"], 
//     ["Secure IXT/USDT liquidity, earn 7% APR", "Secure IXT/MATIC liquidity, earn 7% APR"], 
//     ["Lend 100x IXT with USDT as collateral",]
//   ],
//   [
//     ["Youe personal game lobby", "explore land & trande assets at NetEmpire","Coming soon", "Farm, stake and earn"], 
//     ["Upgrade you AOC badge for greater utility", "Burn Avatars for in-game utility", "Claim arcade airdrops"], 
//     [ "Daily players, transaction volume and more.",
//       "Dashboard reflecting our NFT assets performance.",
//       "IX token vesting schedule.",
//       "IX Token holders, stakers and more.",
//       "Officials links to all Planet IX contracts."
//     ]
//   ],
// ]  
</script>
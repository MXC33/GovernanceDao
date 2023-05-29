export interface SubHeaderObject {
  title: string,
  description: string,
  image: string,
  useLink: boolean,
  link: string
}

export interface CategoryHeaderObject {
  title: string,
  subHeaders : SubHeaderObject[]
}

export interface AllCategoryHeaderObject {
  categoryHeaderObject : CategoryHeaderObject[]
}
  
export interface CategoryHeader {
  type: string,
  subHeaders: string[]
}

export interface TopHeader {
  type: string,
  categories: CategoryHeader[]
}



export const buyIXTHeaderItems: CategoryHeader[] = [
  {
    type: 'swap',
    subHeaders: ['swap']
  },
  {
    type: 'bridge',
    subHeaders: ['polygon']
  },
  {
    type: 'supply',
    subHeaders: ['usdt', 'matic']
  },
  {
    type: 'lend',
    subHeaders: ['capital']
  }
]

export const playNowHeaderItems: CategoryHeader[] = [
  {
    type: 'THE GAME',
    subHeaders: ['TERMINAL', 'MARKETPLACE', 'IX ARENA', 'MISSION CONTROL', 'GAMEBOOK']
  },
  {
    type: 'CLAIM & BURN',
    subHeaders: ['AOC BADGE', 'AVATAR', 'ARCADE']
  },
  {
    type: 'ANALYTICS',
    subHeaders: ['GAME PERFORMANCE', 'NFT PERFORMANCE', 'VESTING SCHEDULE' , 'IXT PERFORMANCE', 'SMART CONTRACTS'] 
  },
]

export const stakingHeaderItems: CategoryHeader[] = [
  {
    type: 'OVERVIEW',
    subHeaders: ['DASHBOARD', 'EARNINGS OVERVIEW']
  },
  {
    type: 'TOKEN STAKING',
    subHeaders: ['IXT', 'LP', 'SUPPLY LIQUIDITY']
  },
  {
    type: 'IN-GAME ASSETS STAKING',
    subHeaders: ['TERRITORY', 'ENERGY', 'GOVERNANCE' , 'METASHARES', 'LANDMARKS', 'IXT CAT RAFF', 'LEND CAPITAL'] 
  },
]

const siteTopHeaders: TopHeader[] = [
  {
    type: 'buy',
    categories: buyIXTHeaderItems,
  },
  {
    type: 'play',
    categories: playNowHeaderItems,
  },
  {
    type: 'staking',
    categories: stakingHeaderItems,
  },
  {
    type: 'community',
    categories: buyIXTHeaderItems,
  },
  {
    type: 'analytics',
    categories: buyIXTHeaderItems,
  }
] 

export const useSiteHeader = () => {
  const OnClickSubHeader = (title:string) => {
    switch(title) {
      case 'Swap':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'Polygon':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'IXT/USDT':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'IXT/MATIC':
        return window.location.href = 'https://dashboard.ix.foundation/'
      case 'Lend Capital':
        return window.location.href = 'https://dashboard.ix.foundation/'
    }
  }



  return {
    siteTopHeaders,
    OnClickSubHeader
  }
}








const buyIXTHeaders: CategoryHeaderObject[] = [
  {
    title: "Buy IXT",
    subHeaders: [
      {
        title: "Swap",
        description: "Swap any crypto or fiat to ixt",
        image: "swap",
        useLink: false,
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
        image: "polygon",
        useLink: false,
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
        image: "usdt",
        useLink: false,
        link: ""
      },
      {
        title: "IXT/MATIC (Sushiswap)",
        description: "Secure IXT/USDT liquidity, earn 4% APR.",
        image: "matic",
        useLink: false,
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
        image: "lendCapital",
        useLink: false,
        link: ""
      }
    ]
  }
]

const playNowHeaders: CategoryHeaderObject[] = [
  {
    title: "The Game",
    subHeaders: [
      {
        title: "Terminal",
        description: "Your personal game lobby",
        image: "swap",
        useLink: false,
        link: ""
      },
      {
        title: "Marketplace",
        description: "Explore land & trade assets at NetEmpire.",
        image: "market",
        useLink: false,
        link: ""
      },
      {
        title: "IX Arean",
        description: "COMING SOON",
        image: "trophy",
        useLink: false,
        link: ""
      }, {
        title: "Mission Control",
        description: "Farm, stake and earn.",
        image: "mc",
        useLink: false,
        link: ""
      }, {
        title: "Gamebook",
        description: "Deepdive into the Planet IX ecosystem.",
        image: "gamebook",
        useLink: false,
        link: ""
      },
    ]
  },
  {
    title: "Claim & Burn",
    subHeaders: [
      {
        title: "AOC Badge",
        description: "Upgrade your AOC badge for greater utility.",
        image: "aoc",
        useLink: false,
        link: ""
      },
      {
        title: "Avatar",
        description: "Burn Avatars for in-game utility.",
        image: "avatar",
        useLink: false,
        link: ""
      },
      {
        title: "Arcade",
        description: "Claim Arcade airdrops.",
        image: "",
        useLink: false,
        link: ""
      }
    ]
  },
  {
    title: "Analytics",
    subHeaders: [
      {
        title: "Game perfoamce",
        description: "Daily players, transaction volume and more.",
        image: "performance",
        useLink: false,
        link: ""
      },
      {
        title: "NFT perfoamce",
        description: "Dashboard reflecting our NFT assets performance.",
        image: "performance",
        useLink: false,
        link: ""
      },
      {
        title: "Vesting Schedule",
        description: "IX token vesting schedule.",
        image: "vesting",
        useLink: false,
        link: ""
      },
      {
        title: "IXT perfoamce",
        description: "IX Token holders, stakers and more.",
        image: "performance",
        useLink: false,
        link: ""
      },
      {
        title: "Smart Contracts",
        description: "Officials links to all Planet IX contracts.",
        image: "smartcontract",
        useLink: false,
        link: ""
      }
    ]
  },
]
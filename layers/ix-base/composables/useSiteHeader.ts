export interface SubHeaderObject {
  title: string,
  description: string,
  image: string,
  useLink: boolean,
  link: string
}

export interface CategoryHeaderObject {
  title: string,
  subHeaders: SubHeaderObject[]
}

export interface AllCategoryHeaderObject {
  categoryHeaderObject: CategoryHeaderObject[]
}

export interface HeaderCategory {
  type: string,
  items: string[]
}

export interface HeaderItem {
  type: string,
  categories: HeaderCategory[]
}

export const buyIXTHeaderItems: HeaderCategory[] = [
  {
    type: 'swap',
    items: ['swap']
  },
  {
    type: 'bridge',
    items: ['polygon', "ethereum"]
  },
  // {
  //   type: 'supply',
  //   items: ['usdt', 'matic']
  // },
  {
    type: 'lend',
    items: ['capital']
  }
]

export const playNowHeaderItems: HeaderCategory[] = [
  {
    type: 'game',
    items: ['teminal', 'market', 'arena', 'mc', 'gamebook']
  },
  {
    type: 'claimburn',
    items: ['aocbadge', 'avatar', 'arcade']
  },
  // {
  //   type: 'analytics',
  //   items: ['game', 'nft', 'vesting', 'ixt', 'smart-contracts']
  // },
]

export const corporationsHeaderItems: HeaderCategory[] = [
  {
    type: 'netempire',
    items: ['trande-land', 'trade-assets', 'incoming-bids']
  },
  {
    type: 'eternallabs',
    items: ['bio-mods-lab', 'eternal-shop', 'stake-burn-asset']
  },
  {
    type: 'newlands',
    items: ['construction', 'newlands-shop', 'stake-burn-asset']
  },
  {
    type: 'y_',
    items: ['y_shop', 'service-points', 'stake-burn-asset']
  },
  {
    type: 'luckycat',
    items: ['lucky-raffle', 'avatar']
  },
  {
    type: 'astrocap',
    items: ['exchange-service']
  },
  {
    type: 'gws',
    items: ['waste-management', 'gws-shop ']
  },
  {
    type: 'gravity-grade',
    items: ['gg-shop']
  },
  {
    type: 'haveblue',
    items: ['haveblue-shop']
  },
  {
    type: 'arcade',
    items: ['arcade']
  }, 
] 

export const stakingHeaderItems: HeaderCategory[] = [
  {
    type: 'overview',
    items: ['dashboard', 'earnings-overview']
  },
  {
    type: 'staking',
    items: ['ixt', 'lp', 'supply-liquidity']
  },
  {
    type: 'in-game-assets',
    items: ['territory', 'energy', 'governance', 'metashares', 'landmarks', 'ixt-cat-raff', 'lend-capital']
  },
]

export const communityHeaderItems: HeaderCategory[] = [
  {
    type: 'governance',
    items: ['proposals', 'discussion']
  },
  {
    type: 'news-social',
    items: ['twitter', 'news', 'discord', 'chinese-forum', 'telegram']
  },
]

export const analyticsyHeaderItems: HeaderCategory[] = [
  {
    type: 'analytics',
    items: ['game', 'nft', 'vesting', 'ixt', 'smart-contracts']
  },
]

const siteTopHeaders: HeaderItem[] = [
  {
    type: 'buy',
    categories: buyIXTHeaderItems,
  },
  {
    type: 'play',
    categories: playNowHeaderItems,
  },
  // {
  //   type: 'corporations',
  //   categories: playNowHeaderItems,
  // },
  {
    type: 'staking',
    categories: stakingHeaderItems,
  },
  {
    type: 'community',
    categories: communityHeaderItems,
  },
  {
    type: 'analytics',
    categories: analyticsyHeaderItems,
  }
]

export const useSiteHeader = () => {
  const OnClickSubHeader = (title: string) => {
    switch (title) {
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
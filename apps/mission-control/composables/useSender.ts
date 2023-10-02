import { Corporation } from "./corporations/useCorporations"

export type Sender = 'proxy-of-change' | 'seina' | 'jeremiah' | 'eve-pryde' | 'buck' | 'mayflower' | 'mmi-das' | 'wp5813' | 'ascella-of-the-rain'


export const useSender = () => {
  const getSender = (corporation: Corporation): Sender => {
    switch (corporation) {
      case 'new-lands':
        return 'jeremiah'

      case 'y-space':
        return 'mayflower'

      case 'eternalab':
        return 'eve-pryde'

      case 'lucky-cat':
        return 'seina'

      case 'gws':
        return 'buck'

      case 'astro-cap':
        return 'mmi-das'

      case 'haveblue':
        return 'ascella-of-the-rain'

      case 'gravity-grade':
        return 'wp5813'

      default:
        return 'proxy-of-change'
    }
  }
  const getCorporation = (sender: Sender): Corporation => {
    switch (sender) {
      case 'jeremiah':
        return 'new-lands'

      case 'mayflower':
        return 'y-space'

      case 'eve-pryde':
        return 'eternalab'

      case 'seina':
        return 'lucky-cat'

      case 'buck':
        return 'gws'

      case 'mmi-das':
        return 'astro-cap'

      case 'wp5813':
        return 'gravity-grade'
    }
  }

  return {
    getSender,
    getCorporation
  }

}
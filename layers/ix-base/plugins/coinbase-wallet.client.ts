
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

export const coinbaseWallet = new CoinbaseWalletSDK({
  appName: 'Mission Control',
  appLogoUrl: 'https://missioncontrol.planetix.com/IX-icon.png',
  darkMode: true
})

export default defineNuxtPlugin(() => {
  return {
    provide: {
      coinbaseWallet
    }
  }
})
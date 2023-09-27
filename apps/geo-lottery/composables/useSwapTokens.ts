import {AdjustableNumber} from "@ix/base/composables/Utils/useAdjustableNumber";
import {useAstroGoldContract} from "@ix/base/composables/Contract/useAstroGoldContract";
import {useIXTContract} from "@ix/base/composables/Contract/useIXTContract";
import {astroGoldAdress} from "@ix/base/composables/Contract/WalletAddresses";
import {useActiveChain} from "@ix/base/composables/Contract/useWallet";

export type TokenSwapOrder = 'IXT-AGOLD' | 'AGOLD-IXT'
export const useSwapTokens = () => {
  const { ixtBalance } = useIXTContract()
  const { astroGoldBalance } = useAstroGoldContract()

  const ixtValue = useState<AdjustableNumber>('ixt-swap-value', () => ({
    value: 1,
    min: 1,
    max: computed<number>(() => {
      return ixtBalance.value || 0
    })
  }))

  const aGoldValue = useState<AdjustableNumber>('agold-swap-value', () => ({
    value: 1,
    min: 1,
    max: computed<number>(() => {
      return astroGoldBalance.value || 0
    })
  }))

  const tokenSwapOrder = useState<TokenSwapOrder>('token-swap-order', () => 'IXT-AGOLD')

  const swapTokenOrder = () => {
    tokenSwapOrder.value = tokenSwapOrder.value == 'IXT-AGOLD' ? 'AGOLD-IXT' : 'IXT-AGOLD'
  }

  const {
    swapIXTtoAGOLD: swapIXTtoAGOLDContract,
    swapAGOLDtoIXT: swapAGOLDtoIXTContract
  } = useAstroGoldContract()

  const { allowanceCheck } = useIXTContract()

  const swapIXTtoAGOLD = async (amount: number) => {
    if (!await allowanceCheck(amount, astroGoldAdress[useActiveChain()]))
      throw new Error(CustomErrors.allowanceError)

    return await swapIXTtoAGOLDContract(amount)
  }

  const swapAGOLDtoIXT = async (amount: number) => {
    return await swapAGOLDtoIXTContract(amount)
  }

  return {
    ixtValue,
    aGoldValue,
    tokenSwapOrder,
    swapTokenOrder,

    swapIXTtoAGOLD,
    swapAGOLDtoIXT
  };
};




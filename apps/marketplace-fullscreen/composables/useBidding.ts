import { IXToken, ItemType, OrderType, signDomain, typedData, Bid } from "@ix/base/composables/Token/useIXToken"
import { add } from "date-fns"
import { ethers } from "ethers";
import {
  conduitKey,
  feeTreasuryAdress,
  IXTAddress,
} from "@ix/base/composables/Contract/WalletAddresses";
import { ZERO_ADRESS } from "@ix/base/composables/Utils/defineContract";

import { makeRandomNumberKey } from "@ix/base/composables/Utils/useHelpers";
import { BiddingBody, useBidsAPI } from "~/composables/api/post/useBidAPI";
import { TransactionItem, useTransactions } from "./useTransactions"
import { NFTType } from "~/composables/useAssetContracts";
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";

export interface BiddingItem extends TransactionItem {
  type: 'bid'
}

export interface UnbidItem extends IXToken {
  bid: Bid
}

export const useBiddingItems = () => {
  const { durationInDaysFromTimestamp } = useTransactions()
  const bidItems = useState<BiddingItem[]>('bidding-items', () => [])

  const createBidItems = (items: IXToken[]) => {
    bidItems.value = items.map((token) => ({
      type: 'bid',
      token,
      shares: {
        min: 1,
        value: token.updating ? token.bid.quantity : 1,
        max: token.shares
      },
      durationInDays: token.updating ? durationInDaysFromTimestamp(token.bid.due_date) : 1,
      ixtPrice: token.updating ? token.bid.price : 0
    }))
  }

  return {
    createBidItems,
    bidItems
  }
}

export const useBiddingContract = () => {
  const { allowanceCheck } = useIXTContract()
  const { ixtBalance, refreshIXTBalance } = useIXTContract()
  const { walletAdress, signTypedData } = useWallet()
  const { handleAPIError } = useIXAPI()
  const { getEndTime, baseConsideration, getItemType } = useTransactionContract()
  const createBidMessage = async (item: BiddingItem, endTime: number) => {

    const { token: { collection, token_id }, ixtPrice, shares } = item

    if (!ixtPrice)
      throw new Error(CustomErrors.invalidIXTPrice)

    const totalPrice = ixtPrice * shares.value

    await refreshIXTBalance()

    if (!ixtBalance.value || ixtBalance.value < totalPrice)
      throw new Error(CustomErrors.insufficientBalance)


    if (!await allowanceCheck(totalPrice))
      throw new Error(CustomErrors.allowanceError)

    const ownerPrice = ethers.utils.parseUnits(
      roundUp(totalPrice, 8).toString()
    ).toString()

    const treasuaryFee = ethers.utils.parseUnits(
      roundDown(((5 / 100) * totalPrice), 8).toString()
    ).toString()

    const address = walletAdress.value
    if (!address)
      throw new Error(CustomErrors.noWallet)

    const message = {
      offerer: address,
      zone: ZERO_ADRESS,
      offer: [{
        itemType: ItemType.ERC20,
        token: IXTAddress.polygon,
        identifierOrCriteria: 0,
        startAmount: ownerPrice,
        endAmount: ownerPrice,
        pixHash: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }],
      consideration: [
        {
          itemType: getItemType(item.token),
          token: collection,
          identifierOrCriteria: token_id,
          startAmount: shares.value,
          endAmount: shares.value,
          recipient: address
        },
        {
          ...baseConsideration,
          startAmount: treasuaryFee,
          endAmount: treasuaryFee,
          recipient: feeTreasuryAdress.polygon // fee tresaury
        }
      ],
      orderType: OrderType.PARTIAL_OPEN,
      startTime: Math.floor(Date.now() / 1000),
      endTime: endTime,
      zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      // salt: Web3.utils.toWei("2444686030276173"),
      // salt: "94446860302761739304752683030156737591518664810215442929817355887698947444400",
      salt: ethers.utils.parseUnits(makeRandomNumberKey(16).toString()).toString(),
      conduitKey: conduitKey.polygon,
      counter: 0,
    }

    const signature = await signTypedData(signDomain, typedData, message)

    return JSON.stringify({
      body: message,
      signature: signature
    })
  }

  const placeBids = async (items: BiddingItem[]) => {

    const requests = items.map(async (item) => {
      const { shares, ixtPrice, durationInDays, token: { _index: index, collection, token_id, network } } = item

      const endTime = getEndTime(durationInDays)

      const bidMessage = await createBidMessage(item, endTime)
      if (!bidMessage)
        return null

      return {
        index,
        reference_id: token_id,
        price: Number(ixtPrice),
        quantity: shares.value,
        due_date: endTime,
        collection,
        network,
        message: bidMessage
      } as BiddingBody
    })

    const biddingBodies = await Promise.all(requests)

    try {
      const bidEndpoints = useBidsAPI()
      await bidEndpoints.placeBid(biddingBodies.filter(notNull))
    } catch (error: any) {
      handleAPIError(error)
    }

    return true
  }

  return {
    placeBids
  }
}

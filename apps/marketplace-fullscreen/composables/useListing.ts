import { IXToken, OrderType, useSignDomainMessage, typedData, Sale } from "@ix/base/composables/Token/useIXToken"
import { ethers } from "ethers";
import {
  conduitKey,
  feeTreasuryAdress,
} from "@ix/base/composables/Contract/WalletAddresses";
import { ZERO_ADRESS, ZERO_ADRESS_LONG } from "@ix/base/composables/Utils/defineContract";

import { makeRandomNumberKey } from "@ix/base/composables/Utils/useHelpers";
import { ListingAssets, ListingsBody, useListEndpoints } from "~/composables/api/post/useListAPI";
import { TransactionItem, useTransactions } from "./useTransactions";


export interface ListingItem extends TransactionItem {
  type: 'list'
}

export interface UnlistingItem extends IXToken {
  sale: Sale
}

export const useListingItems = () => {
  const { durationInDaysFromTimestamp } = useTransactions()
  const listItems = useState<ListingItem[]>('listing-items', () => [])

  const createListItems = (items: IXToken[]) => {
    listItems.value = items.map((token) => ({
      type: 'list',
      token,
      shares: {
        min: 1,
        value: token.updating ? token.sales[0].quantity : 1,
        max: token.my_shares
      },
      durationInDays: token.updating ? durationInDaysFromTimestamp(token.sales[0].endtime) : 1,
      ixtPrice: token.updating ? token.sales[0].price : 0,
    }))
  }

  return {
    createListItems,
    listItems
  }
}

const mapAsyncRequests = async <T>(items: ListingItem[], fn: (item: ListingItem) => Promise<T | null>): Promise<T[]> => {
  const requests = await Promise.all(items.map(fn))
  return requests.filter(notNull)
}

export const useListingContract = () => {
  const signDomain = useSignDomainMessage()

  const { handleAPIError } = useIXAPI()
  const listEndpoints = useListEndpoints()
  const { walletAdress, signTypedData } = useWallet()
  const { getEndTime, baseConsideration, getItemType } = useTransactionContract()
  const { getTransactionContract } = useTransactionHelpers()

  //TODO update endtime
  const createListingMessage = async (item: ListingItem, endTime: number) => {
    const { token: { collection, token_id }, ixtPrice, shares, token } = item

    const nftContract = getTransactionContract(token)

    const approveNftCheck = await nftContract.approveNftCheck()
    if (!approveNftCheck) {
      throw new Error(CustomErrors.approvalError)
    }

    const totalPrice = Number(ixtPrice) * shares.value

    const ownerPrice = ethers.utils.parseUnits(
      roundUp(((95 / 100) * totalPrice), 8).toString()
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
        itemType: getItemType(item.token),
        token: collection,
        identifierOrCriteria: token_id,
        startAmount: shares.value,
        endAmount: shares.value,
        pixHash: ZERO_ADRESS_LONG,
      }],
      consideration: [
        {
          ...baseConsideration,
          startAmount: ownerPrice,
          endAmount: ownerPrice,
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
      endTime,
      zoneHash: ZERO_ADRESS_LONG,
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

  const createListingsBody = (item: ListingItem, saleMessage: string, endTime: number): ListingsBody => {
    const { shares, ixtPrice, token: { _index: index, collection, token_id, network } } = item

    const listingAssets: ListingAssets = {
      index,
      collection,
      token_id,
      network,
      quantity: shares.value
    }

    return {
      sale_message: saleMessage,
      sale_price: Number(ixtPrice),
      sale_type: 1, //always 1,
      sale_endtime: endTime,
      assets: [listingAssets]
    }
  }

  const convertListingItem = async (item: ListingItem) => {
    const { durationInDays } = item

    const endTime = getEndTime(durationInDays)

    const saleMessage = await createListingMessage(item, endTime)

    if (!saleMessage)
      return null

    return createListingsBody(item, saleMessage, endTime)
  }

  const updateListing = async (item: ListingItem) => {
    const { token: { updating, sales }, token } = item

    if (!updating)
      return null

    await listEndpoints.removeList(token, sales[0])
  }
  const placeListings = async (items: ListingItem[]) => {
    const body = await mapAsyncRequests(items, convertListingItem)

    if (body.length == 0)
      return false

    try {
      await listEndpoints.listAssets(body)
      await mapAsyncRequests(items, updateListing)
    } catch (error: any) {
      handleAPIError(error)
    }

    return true
  }

  return {
    placeListings
  }
}

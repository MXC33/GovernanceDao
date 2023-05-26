import { IXToken, ItemType, OrderType, signDomain, typedData } from "@ix/base/composables/Token/useIXToken"
import { add } from 'date-fns'
import { get1155Contract } from "~/composables/useAssetContracts";
import { ethers } from "ethers";
import { ZERO_ADDRESS } from "~/composables/useTransferNFT";
import {
  conduitKey,
  feeTreasuryAdress,
  IXTAddress,
  seaportAdress
} from "@ix/base/composables/Contract/WalletAddresses";

import { makeRandomNumberKey } from "@ix/base/composables/Utils/useHelpers";
import { ListingAssets, ListingsBody, useListEndpoints } from "~/composables/api/post/useListAPI";
import { AdjustableNumber } from "~/../../layers/ix-base/composables/Utils/useAdjustableNumber";

export type DurationValue = 0 | 1 | 2 | 3

export interface Duration {
  value: DurationValue,
  name: string
}

export interface ListingItem {
  token: IXToken,
  shares: AdjustableNumber,
  durationInDays: number,
  ixtPrice: number
}

export const useListingItems = () => {
  const listItems = useState<ListingItem[]>('listing-items', () => [])

  const durationDayOptions = [1, 7, 14]

  const createListItems = (items: IXToken[], shares: number) => {
    listItems.value = items.map((token) => ({
      token,
      shares: { value: 1 },
      durationInDays: durationDayOptions[0],
      ixtPrice: 0
    }))
  }

  const totalIXTPrice = computed(() =>
    listItems.value.reduce((prev, item) =>
      prev + (item.ixtPrice * item.shares.value)
      , 0)
  )

  return {
    createListItems,
    totalIXTPrice,
    listItems
  }
}

export const useListingContract = () => {

  const createListingMessage = async (item: ListingItem, endTime: number) => {
    //TODO update endtime

    const { token: { collection, token_id }, ixtPrice, shares } = item
    /*
      Todo
      Start loading overlay
    */
    console.log('start Loading overlay')

    const IXTokenContract = get1155Contract(collection as string)
    const approveNftCheck = await IXTokenContract.approveNftCheck()

    if (!approveNftCheck) {
      /*
        Todo
        Approve didn't work
      */
      alert('Approve didn\'t work')
      return false
    }

    const totalPrice = ixtPrice * shares

    const ownerPrice = ethers.utils.parseUnits(
      roundUp(((95 / 100) * totalPrice), 8).toString()
    ).toString()

    const treasuaryFee = ethers.utils.parseUnits(
      roundDown(((5 / 100) * totalPrice), 8).toString()
    ).toString()

    const { walletAdress, signTypedData } = useWallet()

    const address = walletAdress.value

    if (!address) {
      /*
        Todo
        wallet address is undefined
      */
      alert('wallet address is undefined')
      return false
    }

    const message = {
      offerer: address,
      zone: ZERO_ADDRESS,
      offer: [{
        itemType: ItemType.ERC1155,
        token: collection,
        identifierOrCriteria: token_id,
        startAmount: shares,
        endAmount: shares,
        pixHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      }],
      consideration: [
        {
          itemType: ItemType.ERC20,
          token: IXTAddress.polygon,
          identifierOrCriteria: 0,
          startAmount: ownerPrice,
          endAmount: ownerPrice,
          recipient: address
        },
        {
          itemType: ItemType.ERC20,
          token: IXTAddress.polygon,
          identifierOrCriteria: 0,
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

  const listItem = async (item: ListingItem) => {
    const { shares, ixtPrice, durationInDays, token: { _index: index, collection, token_id, network } } = item

    const endTime = add(new Date(), { days: durationInDays }).getMilliseconds()
    const saleMessage = await createListingMessage(item, endTime)

    try {
      const listingAssets: ListingAssets = {
        index,
        collection,
        token_id,
        network,
        quantity: shares
      }

      const listingsBody: ListingsBody = {
        sale_message: saleMessage as string,
        sale_price: ixtPrice,
        sale_type: 1, //always 1,
        sale_endtime: endTime,
        assets: [listingAssets]
      }

      const listEndpoints = useListEndpoints()
      await listEndpoints.listAssets([listingsBody])

      /*
        Todo
        Success message
      */
      alert('Success message')

    } catch (error: any) {
      /*
        Todo
        API error
      */
      console.log(error.response)
      if (error.response && error.response._data && error.response._data.message) {
        alert(error.response._data.message)
      } else {
        alert('Something wrong happened!!')
      }
      return false
    }
    return true
  }

  return {
    listItem
  }
}
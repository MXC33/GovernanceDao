import { IXToken, ItemType, OrderType, signDomain, typedData } from "@ix/base/composables/Token/useIXToken"
import { add } from 'date-fns'
import {get1155Contract, get721Contract, NFTType} from "~/composables/useAssetContracts";
import { ethers } from "ethers";
import { ZERO_ADDRESS } from "~/composables/useTransferNFT";
import {
  conduitKey,
  feeTreasuryAdress,
  IXTAddress,
} from "@ix/base/composables/Contract/WalletAddresses";

import { makeRandomNumberKey } from "@ix/base/composables/Utils/useHelpers";
import { ListingAssets, ListingsBody, useListEndpoints } from "~/composables/api/post/useListAPI";
import { TransactionItem } from "./useTransactions";


export interface ListingItem extends TransactionItem {
  type: 'list'
}

export const useListingItems = () => {
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
      durationInDays: 1,
      ixtPrice: token.updating ? token.sales[0].price : 0,
    }))
  }

  return {
    createListItems,
    listItems
  }
}

export const useListingContract = () => {

  const createListingMessage = async (item: ListingItem, endTime: number) => {
    //TODO update endtime

    const { token: { collection, token_id, nft_type}, ixtPrice, shares } = item
    /*
      Todo
      Start loading overlay
    */
    console.log('start Loading overlay')

    const nftContract = nft_type === NFTType.ERC1155 ? get1155Contract(collection as string) : get721Contract(collection as string)
    const approveNftCheck = await nftContract.approveNftCheck()
    if (!approveNftCheck) {
      /*
        Todo
        Approve didn't work
      */
      throw new Error("Approve didn't work")
    }

    const totalPrice = Number(ixtPrice) * shares.value

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
      throw new Error("wallet address is undefined")
    }

    const message = {
      offerer: address,
      zone: ZERO_ADDRESS,
      offer: [{
        itemType: item.token.nft_type === NFTType.ERC1155 ? ItemType.ERC1155 : ItemType.ERC721,
        token: collection,
        identifierOrCriteria: token_id,
        startAmount: shares.value,
        endAmount: shares.value,
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

  const createListingsBody = (item: ListingItem, saleMessage: string, endTime: number): ListingsBody => {
    const { shares, ixtPrice, durationInDays, token: { _index: index, collection, token_id, network } } = item

    const listingAssets: ListingAssets = {
      index,
      collection,
      token_id,
      network,
      quantity: shares.value
    }

    return {
      sale_message: saleMessage as string,
      sale_price: Number(ixtPrice),
      sale_type: 1, //always 1,
      sale_endtime: endTime,
      assets: [listingAssets]
    }
  }

  const listItem = async (item: ListingItem) => {
    const { token:{updating}, durationInDays, token } = item

    const endTime = Math.floor(add(new Date(), { days: durationInDays }).getTime() / 1000)
    const saleMessage = await createListingMessage(item, endTime)
    if (!saleMessage)
      return false
    try {
      const listingsBody = createListingsBody(item, saleMessage, endTime)

      const listEndpoints = useListEndpoints()
      await listEndpoints.listAssets([listingsBody])

    } catch (error: any) {

      console.log(error.response)
      if (error.response && error.response._data && error.response._data.message) {
        throw new Error(error.response._data.message)
      } else {
        throw new Error("Something wrong happened!")
      }
    }
    if(updating){
      const { removeList } = useListEndpoints()
      await removeList(token._index, token.token_id, token.sales[0].sale_id, token.network, token.collection)
    }

    return true
  }

  const listItems = async (items: ListingItem[]) => {
    const listingsBody: ListingsBody[] = []

    for (const item of items) {
      const { durationInDays } = item

      const endTime = Math.floor(add(new Date(), { days: durationInDays }).getTime() / 1000)
      const saleMessage = await createListingMessage(item, endTime)
      if (!saleMessage)
        return false

      listingsBody.push(createListingsBody(item, saleMessage, endTime))
    }

    try {
      const listEndpoints = useListEndpoints()
      await listEndpoints.listAssets(listingsBody)

      /*
        Todo
        Success message
      */

    } catch (error: any) {
      /*
        Todo
        API error
      */
      if (error.response && error.response._data && error.response._data.message) {
        throw new Error(error.response._data.message)
      } else {
        throw new Error("Something wrong happened!")
      }
    }
    return true
  }

  return {
    listItem,
    listItems
  }
}

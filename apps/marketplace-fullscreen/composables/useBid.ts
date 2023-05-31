import {ItemType, IXToken, OrderType, signDomain, typedData} from "@ix/base/composables/Token/useIXToken";
import {AdjustableNumber} from "@ix/base/composables/Utils/useAdjustableNumber";
import {ZERO_ADDRESS} from "~/composables/useTransferNFT";
import {conduitKey, feeTreasuryAdress, IXTAddress} from "@ix/base/composables/Contract/WalletAddresses";
import {makeRandomNumberKey} from "@ix/base/composables/Utils/useHelpers";
import {ethers} from "ethers";
import {BiddingBody, useBidsAPI} from "~/composables/api/post/useBidAPI";
import {add} from "date-fns";

export interface BidItem {
  token: IXToken,
  shares: AdjustableNumber,
  durationInDays: number,
  ixtPrice: number
}

export const useBidDuration = () => {
  const { t } = useI18n()

  const formattedDays = (days: number) => {
    const daysAsMonths = Math.floor(days / 30)
    const daysAsWeek = Math.floor(days / 7)

    if (days >= 30)
      return `${daysAsMonths} ${t('general.month', daysAsMonths)}`

    if (days >= 7)
      return `${daysAsWeek} ${t('general.week', daysAsWeek)}`

    return `${days} ${t('general.day', days)}`
  }

  return {
    formattedDays
  }
}

export const useBidItems = () => {
  const bidItems = useState<BidItem[]>('bid-items', () => [])

  const durationDayOptions = [1, 7, 14]

  const createBidItems = (items: IXToken[], shares: number) => {
    bidItems.value = items.map((token) => ({
      token,
      shares: {
        min: 1,
        value: 1,
        max: token.shares
      },
      durationInDays: durationDayOptions[0],
      ixtPrice: 0
    }))
  }

  const getTotalIXTPrice = (items: BidItem[]) =>
    items.reduce((prev, item) =>
        prev + (Number(item.ixtPrice) * item.shares.value)
      , 0)

  return {
    createBidItems,
    getTotalIXTPrice,
    bidItems
  }
}

export const useBidContract = () => {

  const createBidMessage = async (item: BidItem, endTime: number) => {

    const { token: { collection, token_id }, ixtPrice, shares } = item
    /*
      Todo
      Start loading overlay
    */
    console.log('start Loading overlay')

    const totalPrice = ixtPrice * shares.value

    const { ixtBalance } = getIXTokenContract()
    const { data: ixt, refresh: fetchIXT } = ixtBalance()
    await fetchIXT()

    if (!ixt.value || ixt.value < totalPrice) {
      /*
        Todo
        Your balance is insufficient!!
      */
      alert('Your balance is insufficient!!')
      return false
    }

    const { allowanceCheck } = getIXTokenContract()
    if (!await allowanceCheck(totalPrice)) {
      /*
        Todo
        Approve didn't work
      */
      alert('Allowance didn\'t work')
      return false
    }

    const ownerPrice = ethers.utils.parseUnits(
      roundUp(totalPrice, 8).toString()
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
        itemType: ItemType.ERC20,
        token: IXTAddress.polygon,
        identifierOrCriteria: 0,
        startAmount: ownerPrice ,
        endAmount: ownerPrice,
        pixHash: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }],
      consideration:[
        {
          itemType: item.token.nft_type === 0 ? ItemType.ERC1155 : ItemType.ERC721,
          token: collection,
          identifierOrCriteria: token_id,
          startAmount: shares.value,
          endAmount: shares.value,
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

  const bidItem = async (item: BidItem) => {
    const { shares, ixtPrice, durationInDays, token: { _index: index, collection, token_id, network } } = item

    const endTime = Math.floor(add(new Date(), { days: durationInDays }).getTime() / 1000)
    const bidMessage = await createBidMessage(item, endTime)
    if (!bidMessage)
      return false
    try {
      const biddingBody: BiddingBody = {
        index,
        reference_id: token_id,
        price: Number(ixtPrice),
        quantity: shares.value,
        due_date: endTime,
        collection,
        network,
        message: bidMessage
      }

      const bidEndpoints = useBidsAPI()
      await bidEndpoints.placeBid([biddingBody])

      return true

    } catch (error: any) {

      console.log(error.response)
      if (error.response && error.response._data && error.response._data.message) {
        console.error(error.response._data.message)
      } else {
        console.error('Something wrong happened!!')
      }
      return false
    }
  }

  const bidItems = async (items: BidItem[]) => {
    const biddingsBody: BiddingBody[] = []

    for (const item of items) {
      const { shares, ixtPrice, durationInDays, token: { _index: index, collection, token_id, network } } = item

      const endTime = Math.floor(add(new Date(), { days: durationInDays }).getTime() / 1000)
      const bidMessage = await createBidMessage(item, endTime)
      if (!bidMessage)
        return false

      biddingsBody.push({
        index,
        reference_id: token_id,
        price: Number(ixtPrice),
        quantity: shares.value,
        due_date: endTime,
        collection,
        network,
        message: bidMessage
      })
    }

    try {
      const bidEndpoints = useBidsAPI()
      await bidEndpoints.placeBid(biddingsBody)

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
    bidItem,
    bidItems
  }
}

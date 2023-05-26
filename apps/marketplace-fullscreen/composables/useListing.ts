import {ItemType, OrderType, signDomain, typedData} from "@ix/base/composables/Token/useIXToken"
import type {SingleItemData} from "@ix/base/composables/Token/useIXToken"
import {get1155Contract} from "~/composables/useAssetContracts";
import {ethers} from "ethers";
import {ZERO_ADDRESS} from "~/composables/useTransferNFT";
import {
  conduitKey,
  feeTreasuryAdress,
  IXTAddress,
  seaportAdress
} from "@ix/base/composables/Contract/WalletAddresses";
import {makeRandomNumberKey} from "@ix/base/composables/Utils/useHelpers";

export type DurationValue = 0 | 1 | 2| 3

export interface Duration {
  value: DurationValue,
  name: string
}

export const useListing = () => {
  const durationOptions: Duration[] = [
    {
      value: 0,
      name: '3 Days'
    },
    {
      value: 1,
      name: '1 Week'
    },
    {
      value: 2,
      name: '1 Week'
    },
    {
      value: 3,
      name: 'Custom'
    }
  ]

  const list = async (item: SingleItemData, price: number, shares: number, endTime: number) => {
    /*
      Todo
      Start loading overlay
    */
    console.log('start Loading overlay')

    const IXTokenContract = get1155Contract(item.collection as string)
    const approveNftCheck = IXTokenContract.approveNftCheck()

    if (!approveNftCheck) {
      /*
        Todo
        Approve didn't work
      */
      alert('Approve didn\'t work')
      return false
    }

    const totalPrice = price * shares
    const ownerPrice = ethers.utils.parseUnits(
      roundUp(((95 / 100) * totalPrice), 8).toString()
    )
    const treasuaryFee = ethers.utils.parseUnits(
      roundDown(((5 / 100) * totalPrice), 8).toString()
    )

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
        token: item.collection,
        identifierOrCriteria: item.token_id,
        startAmount: shares,
        endAmount: shares,
        pixHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      }],
      consideration:[
        {
          itemType: ItemType.ERC20,
          token: IXTAddress.polygon,
          identifierOrCriteria: 0,
          startAmount: ownerPrice ,
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
      salt: ethers.utils.parseUnits(makeRandomNumberKey(16).toString()),
      conduitKey: conduitKey.polygon,
      counter: 0,
    }

    const signature = await signTypedData(signDomain, typedData, message)

    return JSON.stringify({
      body: message,
      signature: signature
    })
  }

  return {
    durationOptions,
    list
  }
}

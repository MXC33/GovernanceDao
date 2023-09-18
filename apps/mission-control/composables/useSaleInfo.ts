import { Corporation } from "./corporations/useCorporations";

export const useSaleInfoData = (shopId: Corporation) => {
  return useAsyncState(`sale-info-${shopId}`, async () => {

    const { saleInfo } = await GqlSaleInfo({ shopId })
    return saleInfo
  })
}

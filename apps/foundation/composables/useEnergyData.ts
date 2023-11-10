

export const useEnergyData = () => {

  const totalFacilitiesMinted = () =>
    useAsyncDataState('facilities-minted-data', async () => {

      const totalAmount = await GqlTotalFacilitiesMinted()
      return totalAmount.totalFacilitiesMinted as number
    })


  return {
    totalFacilitiesMinted
  }
}
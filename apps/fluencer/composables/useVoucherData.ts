

export const useVoucherData = () =>
  useAsyncDataState('gravity-grade', async () => {
    const credentials = useGraphqlCredentials()
    if (!credentials)
      return

    const gravityGradeNFTBalance = await GqlGravityGradeNFTBalance({ credentials })
    return gravityGradeNFTBalance.gravityGradeNFTBalance?.filter(item => item?.tokenInfo?.type == 'voucher')
  })
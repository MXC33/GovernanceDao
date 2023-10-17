

export interface TokenTypeTier {
  type: string,
  tier?: string
}

export const useVoucherData = () =>
  useAsyncDataState('gravity-grade', async () => {
    const credentials = useGraphqlCredentials()
    if (!credentials)
      return

    const gravityGradeNFTBalance = await GqlGravityGradeNFTBalance({ credentials })
    return gravityGradeNFTBalance.gravityGradeNFTBalance?.filter(item => item?.tokenInfo?.type == 'voucher')
  })



export const fetchVoucherContent = (token: TokenTypeTier) => {
  const key = `${token.type}-${token.tier}`
  return useAsyncDataState('gravity-grade-content' + key, async () => {
    const ggContent = await GqlGGPackContent({ token })
    return ggContent.gravityGradePackContent
  })
}

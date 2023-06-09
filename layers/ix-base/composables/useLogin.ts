import { WalletConnector } from "./Contract/useWalletConnectors";

export interface APIUser {
  id: number;
  email: string;
  username: string;
  web3: boolean;
  wallet_address: string;
}

export interface APIAuthResponse {
  player: APIUser;
  access_token: string;
  expires_in: string;
}

type LoginStatus = 'logged-in' | 'logged-out' | 'connecting' | 'checking'
type LoginFailState = 'no-user'

export const useAuthUserData = () => useCookieState<APIAuthResponse | null>('auth-data', () => null)
export const useAuthTokenExpirationTime = () => useCookieState<number | null>('auth-token-expiration', () => 0)

export const useLoginRedirect = () => useState<string | null>('login-redirect', () => null)


export const useLogin = () => {
  const { loginIX } = useIXAPI()
  const { authUser, user, removeUser } = useUser()
  const { addSigningToken, connectWallet, logoutWallet, walletSigningToken, isWalletConnected, failedConnection } = useWallet()
  const { setConnector, currentConnector } = useConnectors()
  const authUserData = useAuthUserData()
  const authTokenExpirationTime = useAuthTokenExpirationTime()

  let authTokenExpirationTimeout: ReturnType<typeof setTimeout>
  const timeGap = 5 * 60 * 1000
  let tryingToRefresh = 0

  const loginStatus = useState<LoginStatus>('user-status', () => 'logged-in')
  const loginFailType = useState<LoginFailState | null>('fail-state', () => null)

  const isLoggedInAndConnected = computed(() => user.value && user.value.id && isWalletConnected.value)

  const loginFailed = (reason?: string) => {
    loginStatus.value = 'logged-out'
    failedConnection(reason)
  }

  const loginSuccess = () => {
    loginStatus.value = 'logged-in'
    console.log("[LOGIN]", "Successfully")
  }

  const getIXUser = async (): Promise<APIUser | null> => {
    if (!walletSigningToken.value)
      return null

    try {
      const authUser = await loginIX(walletSigningToken.value) as APIAuthResponse
      authUserData.value = authUser
      authTokenExpirationTime.value = new Date(new Date().getTime() + (1000 * 60 * 60 * 24)).getTime() // 1 day
      setRefreshToken(authTokenExpirationTime.value - Date.now() - timeGap)
    } catch (error) {
      console.log("No user")
      return null
    }

    if (authUserData.value?.player)
      return authUserData.value.player
    else
      return null
  }

  const resetState = () => {
    const { removeUser } = useUser()

    logoutWallet()
    removeUser()
    loginStatus.value = 'connecting'
    loginFailType.value = null
  }

  const createAuthCookies = (token: string, web3Token: string) => {
    const web3AccountType = useCookieState<string | null>('web3AccountType', () => '')
    web3AccountType.value = 'metamask'

    const authStrategy = useCookieState<string | null>('auth.strategy', () => '')
    authStrategy.value = 'local'

    const authTokenLocal = useCookieState<string | null>('auth._token.local', () => '')
    authTokenLocal.value = 'Bearer ' + token

    const web3TokenCookie = useCookieState<string | null>('web3Token', () => '')
    web3TokenCookie.value = web3Token
  }

  const loginUser = async (connector: WalletConnector) => {
    resetState()

    setConnector(connector)

    const isConnected = await connectWallet()
    if (!isConnected)
      return loginFailed()

    await useWait(300)

    const didSign = await addSigningToken()
    if (!didSign)
      return loginFailed()

    const newUser = await getIXUser()

    if (newUser) {
      if (currentConnector.value == 'injected' && authUser.value?.access_token && walletSigningToken.value)
        createAuthCookies(authUser.value?.access_token, walletSigningToken.value)

      return loginSuccess()
    }
    else
      return loginFailedNoUser()
  }

  const loginFailedNoUser = () => {
    loginFailed("No IX user registered on wallet")
    loginFailType.value = 'no-user'
  }

  const setRefreshToken = (time: number) => {

    const headers = useIXHeaders()
    authTokenExpirationTimeout = setTimeout(async () => {
      clearTimeout(authTokenExpirationTimeout)

      try {
        const { data, status }: { data: { access_token: string }, status: number } = await $fetch(BASE_API_ENDPOINT_URL + '/auth/refresh', {
          method: 'POST',
          headers: {
            ...headers.value
          }
        })

        if (authUserData && authUserData.value) {
          authTokenExpirationTime.value = new Date(new Date().getTime() + (1000 * 60 * 60 * 24)).getTime() // 1 day
          authUserData.value.access_token = data.access_token
          setRefreshToken(authTokenExpirationTime.value - Date.now() - timeGap)
        }

      } catch (error) {
        if (error.response && error.response.status !== 401 && tryingToRefresh <= 3) {
          setRefreshToken(0)
          tryingToRefresh++
        } else {
          logoutWallet()
          removeUser()
          return await navigateTo(`/connect`)
        }
      }
    }, time)

  }

  return {
    loginUser,
    loginFailType,
    loginStatus,
    isLoggedInAndConnected,
    authUserData,
    setRefreshToken
  }
}

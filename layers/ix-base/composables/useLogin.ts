import type { WalletConnector } from "./useWalletConnectors";

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


export const useLogin = () => {
  const { loginIX } = useIXAPI()
  const { user } = useUser()
  const { addSigningToken, connectWallet, logoutWallet, walletSigningToken, isWalletConnected, failedConnection } = useWallet()
  const { setConnector } = useConnectors()
  const authUserData = useAuthUserData()
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

    if (newUser)
      return loginSuccess()
    else
      return loginFailedNoUser()
  }

  const loginFailedNoUser = () => {
    loginFailed("No IX user registered on wallet")
    loginFailType.value = 'no-user'
  }

  return {
    loginUser,
    loginFailType,
    loginStatus,
    isLoggedInAndConnected,
    authUserData
  }
}
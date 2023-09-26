import { CredentialsInput } from '#gql'
import type { APIUser, APIAuthResponse } from './useLogin'
import {useLogin} from "./useLogin";

export const useUser = () => {
  const { removeSyncAuthCookies } = useLogin()
  const authUser = useCookieState<APIAuthResponse | null>('auth-data', () => null, { consentLevel: 'necessary' })

  const hasUser = computed(() => user.value != null)
  const user = computed(() => (authUser.value?.player as APIUser) ?? null)

  const removeUser = () => {
    authUser.value = null
    removeSyncAuthCookies()
  }

  return {
    user,
    removeUser,
    authUser,
    hasUser
  }
}


export const useGraphqlCredentials = (): CredentialsInput | null => {
  const { walletAdress } = useWallet()
  const { user } = useUser()
  const userId = user.value?.id

  if (!walletAdress.value) {
    return null
  }

  return {
    playerId: userId,
    walletAddress: walletAdress.value
  }
}

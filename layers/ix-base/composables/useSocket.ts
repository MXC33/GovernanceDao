
export interface NotificationSocket {
  title: string,
  message: string
}

export const useNotificationsLibrary = () => {
  const state = useState<NotificationSocket[]>('notification-lib', () => [])

  const addMessage = (title: string, message: string) => {
    state.value.push({ title, message })
  }

  return {
    data: state,
    addMessage
  }
}

export const useSocket = () => {
  const nuxt = useNuxtApp()

  return nuxt.$socket
}
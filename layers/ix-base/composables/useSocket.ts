
import type { Notification } from '@ix/base/composables/useNeNotificationsAndMessages'

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
  const { user } = useUser()
  const nuxt = useNuxtApp()

  const socket = nuxt.$socket

  const emitStatusUpdate = ({ notification: { id, type } }: Notification) => {
    socket.emit('statusUpdate', {
      notification_id: id,
      type,
      player_id: user.value?.id,
    })
  }

  return {
    emitStatusUpdate,
    socket
  }
}
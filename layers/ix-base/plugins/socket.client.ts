
import { useNeMessages, useNeNotifications } from '@ix/base/composables/useNeNotificationsAndMessages';
import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
  const { addSocketItem } = useNeNotifications()
  const { refresh: reloadMessages } = useNeMessages()
  const socket = io("wss://api.planetix.com", {
    path: '/socket.io',
    upgrade: true,
    autoConnect: true,
    transports: ['websocket'],
  });

  const { user } = useUser()

  socket.on('notification_global', (payload) => {
    reloadMessages()
  })

  watch(user, (player, oldPlayer) => {
    const playerID = player?.id
    const oldID = oldPlayer?.id
    if (oldID)
      socket.off('notification_' + oldID)

    socket.on('notification_' + playerID, (payload) => {
      addSocketItem(payload)
    })
  }, { deep: true, immediate: true })

  socket.on('message', (data) => {
    console.log(data, 'base');
  });

  return {
    provide: {
      socket
    }
  }
})
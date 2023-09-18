
import { useNeMessages, useNeNotifications } from '~/composables/useNeNotificationsAndMessages';
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

  console.log("In Script")

  socket.on('connect', () => {
    console.log('connected to planetIX');
  });

  const { user } = useUser()

  socket.on('notification_global', (payload) => {
    console.log("I has recived a message")
    reloadMessages()
  })

  watch(user, (player, oldPlayer) => {
    const playerID = player?.id
    const oldID = oldPlayer?.id
    console.log("playerID", playerID, "oldID", oldID)
    if (oldID)
      socket.off('notification_' + oldID)

    socket.on('notification_' + playerID, (payload) => {
      console.log("I has recived a notificationz", payload)
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
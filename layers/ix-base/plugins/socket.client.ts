
import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
  const { addMessage } = useNotificationsLibrary()

  const socket = io("wss://api.planetix.com", {
    path: '/socket.io',
    upgrade: true,
    autoConnect: true,
    transports: ['websocket'],
  });

  console.log("SOCKET MAN!")

  socket.on('connect', () => {
    console.log('connected');
    addMessage("Connected", "Hello world")
  });

  const { user } = useUser()

  socket.on('notification_global', (payload) => {
    console.log("I been has mesug")
  })

  watch(user, (player, oldPlayer) => {
    const playerID = player?.id
    const oldID = oldPlayer?.id
    console.log("playerID", playerID, "oldID", oldID)
    if (oldID)
      socket.off('notification_' + oldID)

    socket.on('notification_' + playerID, (payload) => {
      console.log("I got notificationzzz")
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

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

  socket.on('42', (data) => console.log("Data", data))
  socket.on('data', (data) => console.log("Dateea", data))

  socket.on('message', (data) => {
    console.log(data, 'base');
  });

  return {
    provide: {
      socket
    }
  }
})
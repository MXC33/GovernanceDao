<template lang ="pug">
//-div() {{ connected }}
button(@click="toggleNotification")
  BellFilled(v-if="!showNotification" w="6" h="6")
  BellEmpty(v-else w="6" h="6")
Transition(name="slide-top" mode="out-in")
  NotificationMenu(v-if="showNotification")
</template>

<script lang="ts" setup>
import BellFilled from '~/assets/images/icons/bellFilled.svg'
import BellEmpty from '~/assets/images/icons/bellEmpty.svg'
const showNotification = ref(false)

const toggleNotification = () => showNotification.value = !showNotification.value

const authUserData = useAuthUserData()
//wss://api.planetix.com/socket.io/?EIO=4&transport=websocket


const io = useIO()
const socket = io('ws://api.planetix.com/socket.io/?EIO=4&transport=websocket')


const statusUpdate = () => {
  // if (socket) {
  //   socket.emit('statusUpdate', {
  //     notification_id: 62972696,
  //     type: 2,
  //     player_id: 578214,
  //   })
  // }
}

onMounted(() => {
  statusUpdate()
})


</script>
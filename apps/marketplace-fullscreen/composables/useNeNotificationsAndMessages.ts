export interface NotificationRequest {
  success: boolean
  status: number
  message: string
  data: NotificationData
}

export interface NotificationData {
  today: Notification[]
  yesterday: Notification[]
  old: Notification[]
  count: number
  unread: number
}

export interface Notification {
  id: number
  notification_id: number
  system: number
  is_read: number
  created_at: string
  player_id: number
  notification: NotificationMessage
}

export interface NotificationMessage {
  id: string
  title: string
  message: string
  type: number
  created_at: string
  categories: any
}


export const useNeNotifications = () => { 
    const { fetchIXAPI } = useIXAPI()
    return useAsyncDataState('notification', async () => {
      const data = (await fetchIXAPI('notifications/notification/1?unread=false'))
      console.log("notification", data)
      return data
  })
}

export const useNeMessages = () => {
  const { fetchIXAPI } = useIXAPI()
  return useAsyncDataState('notification-messages', async () => {
    return (await fetchIXAPI('notifications/messages/1?unread=false')) as NotificationRequest
  }, {transform: (response) => response?.data} )
}

// export const actions: ActionTree<NotificationsModuleState, RootState> = {
//   async fetchNotifications({ state, commit }, page) {
//     const response = await this.$axios.$get('/notifications/notification/' + page + '?unread=' + state.showOnlyUnread);
//     commit('GET_NOTIFICATIONS', response.data);
//   },

//   async fetchMessages({ state, commit }, page) {
//     const response = await this.$axios.$get('/notifications/messages/' + page + '?unread=' + state.showOnlyUnread);
//     commit('GET_MESSAGES', response.data);
//   },

//   async markAsRead({ commit }) {
//     const response = await this.$axios.$put('/notifications/markAllAsRead');
//     commit('MARK_AS_READ', response.data)
//     return response;
//   },

//   async fetchTopBarMessage({ commit }) {
//     const response = await this.$axios.$get('/banner');
//     commit('GET_TOPBARMESSAGE', response.data)
//     return response;
//   }
// }

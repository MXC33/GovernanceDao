<template lang="pug">
div(aspect="square" max-w="full" max-h="full" h="full" flex-center="row" :logged-in="isLoggedIn") 
  UserProfile(v-if="isLoggedIn" w="15")
  HelperLoaderSpinner(v-else w="full" mt="0")
</template>

<script setup lang="ts">
import UserProfile from '~/assets/images/ui/user/user-profile.svg'


const { user } = useUser()
const { loginStatus } = useLogin()
const isLoggedIn = computed(() => loginStatus.value == 'logged-in')
const userId = computed(() => user.value?.username || null)
const userAvatar = computed(() => userId.value ? userId.value.slice(0, 2) : '')
</script>
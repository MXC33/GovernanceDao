<template lang="pug">
VList(items="center" justify="center" flex-grow="1")
  HelperLoader(fill="ix-orange")
  
</template>


<script lang="ts" setup>
const route = useRoute()
const { logoutWallet } = useWallet()
const { removeUser } = useUser()
const token = useCookie('web3Token')
const acc = useCookie("wallet-accounts")

logoutWallet()
removeUser()

const redirectQuery = route.query.origin

if (process.client) {
  token.value = null
  acc.value = null

  if (redirectQuery) {
    const path = decodeURIComponent(String(redirectQuery))
    const ensureRelativeQuery = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/gmi
    if (path.match(ensureRelativeQuery))
      navigateTo({
        path: '/connect',
        query: {
          origin: redirectQuery
        }
      })
    else
      navigateTo('/connect')
  } else {
    navigateTo('/connect')
  }
}

</script>
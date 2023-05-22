<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="0")
  Header()

  PageHeader()

  //- Used for teleports
  div(id="overlays" select="none")

  slot
</template>

<script lang="ts" setup>
const { setRefreshToken } = useLogin()
const { user } = useUser()
onMounted(() => !user.value || setRefreshToken(0))
</script>
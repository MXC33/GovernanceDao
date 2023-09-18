<template lang="pug">
div(flex="~ row" items="center" justify="start" @click="$emit('clickProfile')" p="3" space-x="3" w="full" max-w="lg:80" cursor="pointer" transition="all duration-200" rounded="sm") 
  UserHeaderProfileAvatar()

  div(flex="~ col" justify="center" min-w="0" )
    ClientOnly
      UserStatus(ml="-1" text="xs")
      div(color="mc-orange" text-shadow="mc-orange" v-if="userId") {{ userId }}

</template>

<script setup lang="ts">
const { user } = useUser()

const userId = computed(() => user.value?.username || null)
defineEmits(['clickProfile'])
</script>
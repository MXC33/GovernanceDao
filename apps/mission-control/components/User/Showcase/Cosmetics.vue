<template lang="pug">
div(flex-center="row")
  div(v-for="title in showCaseTitles" flex="~ col grow" m="l-2" w="1/5" space-y="2")
    div(aspect="square" border="1 mc-orange_20")
    div(flex="~ row" justify="between" items="center" bg="mc-orange_10" border="1 mc-orange_20" p="1")
      div(flex="~ col" align="left")
        p(text="xs mc-white_80") {{ title }}
        p(text="sm mc-orange") image name
      EditIcon(w="4")
</template>

<script setup>
  import EditIcon from '~/assets/images/ui/user/icon_edit.svg'

  const showCaseTitles = ['avatar',  'profile background', 'mc background', 'mc effect', 'banner']
</script>

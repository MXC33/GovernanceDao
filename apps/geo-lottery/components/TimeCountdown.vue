<template lang="pug">
div(m="y-5")
  p(text="base center" m="b-5" color="$mc-gray-100") TIME LEFT:
  div(flex="~" justify="center")
    div(flex="~ col" m="r-4")
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="14" h="12" text="xl" m="b-2") 4
      span(text="center" color="$mc-gray-100") DAYS
    div(flex="~ col" m="r-4")
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="14" h="12" text="xl" m="b-2") 20
      span(text="center" color="$mc-gray-100") HOURS
    div(flex="~ col" m="r-4")
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="14" h="12" text="xl" m="b-2") 25
      span(text="center" color="$mc-gray-100") MIN
    div(flex="~ col" m="r-4")
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="14" h="12" text="xl" m="b-2") 54
      span(text="center" color="$mc-gray-100") SEC

</template>

<script lang="ts" setup>

</script>

<template lang="pug">
div(class="round_tracker")
  p(text="xl center" font="extrabold" m="b-4 md:b-9" ) ROUND #031
  div(grid grid-cols="4" gap-1 p=" md:x-15 lg:x-25 2xl:x-65")
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 xs:60 sm:28 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik")
        slot(name="days") -
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik") DAYS
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 sm:28 md:30 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik")
        slot(name="hours") -
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik") HOURS
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 sm:28 md:30 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik")
        slot(name="minutes") -
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik") MINUTES
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" color="$mc-pink" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 sm:28 md:30 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik")
        slot(name="seconds") -
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik") SECONDS

</template>

<script lang="ts" setup>

</script>

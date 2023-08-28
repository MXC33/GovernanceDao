<template lang="pug">
button(p="3 r-12" flex="~" w="full" pos="relative")
  span() 
    slot()
  span(pos="absolute right-3")
    slot(name="icon")
</template>



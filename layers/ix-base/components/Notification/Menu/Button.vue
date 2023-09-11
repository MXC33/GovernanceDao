<template lang="pug">
button(p="r-9" flex="~" w="full" pos="relative")
  span() 
    slot()
  span(pos="absolute right-0")
    slot(name="icon")
</template>



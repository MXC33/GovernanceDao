<template lang="pug">
VList(items="center" justify="top" bg="gray-900" flex-grow="1" pos="relative")
  VList(items="start")
    //- Above generic wrapper - testing components under
    VList(w="full" bg="yellow" justify="center" items="center")
      transition(name="slide-left")
        ContentDrawerWrapper()
  
</template>
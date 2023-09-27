<template lang="pug">
HList(items="center" px="4" b="$mc-accent") 
  div(flex="grow")
    slot(name="left")
  div(color="$mc-accent")
    slot(name="right")
</template>
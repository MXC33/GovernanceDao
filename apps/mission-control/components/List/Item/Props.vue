<template lang="pug">
HList(space-x="2" items="center") 
  span(color="gray-200" text="xs") 
    slot(name="name")
  div(text="sm" color="mc-mint")
    slot(name="value")


</template>
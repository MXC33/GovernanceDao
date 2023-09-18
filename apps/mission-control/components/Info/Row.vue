<template lang="pug">
HList(justify="between" b="b-1 $mc-accent-40")
  div()
    slot(name="name")

  div(color="$mc-accent" font="bold")
    slot(name="value")
</template>


<template lang="pug">
div(cut="bottom-right b-$mc-accent-60" p="2" uppercase="~" break="words")
  div(text="xs")
    slot(name="header")

  div(font="bold" color="$mc-accent")
    slot(name="default")
    
</template>
<template lang="pug">
VList(space-y="2")
  InfoHeader()
    slot(name="header")

  article
    slot(name="default")
</template>
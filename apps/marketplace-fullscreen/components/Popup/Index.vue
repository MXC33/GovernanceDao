<template lang="pug">
//-PopupWrapper()
div(pos="sticky top-50%" bg="black opacity-80%" rounded="5" m="35%" z="100" b="~ red" backdrop="blur")
  VList(p="5" items="center" capitalized="~")
    slot()

</template>
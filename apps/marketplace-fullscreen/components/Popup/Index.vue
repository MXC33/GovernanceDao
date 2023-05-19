<template lang="pug">
//-PopupWrapper()
div(pos="sticky top-45%" bg="black opacity-80%" rounded="5" m="auto" z="100" b="~ red" backdrop="blur")
  VList(p="5" items="center" capitalized="~" space-y="5")
    slot()
    //- w="100" h="100" top-50% left-50%
</template>
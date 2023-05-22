<template lang="pug">
//-PopupWrapper()
div(pos="sticky top-45%" bg="white opacity-80%" m="auto" z="100" b="~ red" backdrop="blur")
  VList(p="5" capitalized="~" space-y="5")
    slot()
    //- w="100" h="100" top-50% left-50%
</template>
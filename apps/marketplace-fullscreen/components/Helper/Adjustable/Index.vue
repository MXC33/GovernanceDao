<template lang="pug">
HList(flex-grow="1" space-x="1" w="full")
  HelperAdjustableButton(type="minus")

  HList(flex-grow="1" w="full" justify="center" b="1 $mc-secondary_40 on-inline:0" items="center" pos="relative")
    HelperAdjustableNumber()

  HelperAdjustableButton(type="plus")

</template>


<template lang="pug">
HList(flex-grow="1" space-x="1" w="full" b="1 ix-white opacity-40" rounded="lg" bg="ix-white opacity-20" )
  HelperAdjustableButton(type="minus")

  HList(flex-grow="1" w="full" justify="center" items="center" pos="relative")
    HelperAdjustableNumber()

  HelperAdjustableButton(type="plus")

</template>


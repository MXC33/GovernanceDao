<template lang="pug">
div(flex="~ row" items="center" space-x="4" uppercase="~" text="xs") 
  HelperLoaderSpinner(w="10")
  div(color="$mc-accent" uppercase="~") {{$t(`game.helper.loadingUser`)}}
</template>
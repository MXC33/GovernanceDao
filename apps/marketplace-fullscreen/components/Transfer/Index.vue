<template lang="pug">
div(text="2xl red") Trasfer Asset
VList(items="center" p="3")
  div(text="red") Quantity  
  HelperAdjustable(text="2xl")
div(text="red") You own 26 of this item
VList(items="center" space-y="3")
  div(text="2xl red") Wallet Adress
  Input(text="2xl red" bg="black" placeholder="Put Adress Here" )
  button(rounded="1" text="2xl black" bg="red") Confirm Adress
</template>
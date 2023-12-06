<template lang="pug">
Card(w="80%" )
  HList(space-x="6")
    PageSection(section="delegate")
  div(frame="~ gray-400" h="10")
    input(type="text" h="full" font="bold" :placeholder="'Enter wallet address'"  @keyup.enter="onChangeSearch" text="lt-md:base"
    bg="gray-900 ix-black" outline="none" px="2" w="full" size="3" overflow="hidden" )
  HList(grid="~ cols-2" space-x="3")
    ButtonGlitch(btn="~ primary-outline-cut"  text="DELEGATE")
    ButtonGlitch(btn="~ primary-outline-cut"  text="WITHDRAW")
  HList(justify="between" )
    div() total Delegate
    div() Voting Delegate:
</template>

<script lang="ts" setup></script>

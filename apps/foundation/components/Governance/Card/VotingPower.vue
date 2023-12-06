<template lang="pug">
Card()
  HList(space-x="6")
    PageSection(section="votingPower")
    ButtonGlitch(btn="~ primary-outline-cut"  text="Voting Power")
  HList(justify="between")
    div() total Voting
    div() Voting Pow
</template>

<script lang="ts" setup></script>

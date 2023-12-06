<template lang="pug">
Card()
  HList(space-x="6")
    PageSection(section="newProposal")
    ButtonGlitch(btn="~ primary-outline-cut"  text="New")
  HList(justify="between")
    div() total
    div() Voting
</template>

<script lang="ts" setup></script>

<template lang="pug">
PageSection(section="governance")
  HList(gap-6)
    Card()
      PageSection(section="GovDiscussion")
      template(#detailBottom)
        div Total Discussion
        button(btn="~ primary-outline") VIEW DISCUSSION
    Card()
      PageSection(section="GovProposal")
      template(#detailBottom)
        div Total Proposal
        button(btn="~ primary-outline") VIEW PROPOSAL
</template>

<script lang="ts" setup>

</script>
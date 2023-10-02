<template lang="pug">
div.info-box(b="1 $mc-accent-40" p="2" uppercase="~")
  slot
</template>
<style>
.info-box strong {
  color: var(--mc-accent);
  font-weight: inherit;
}
</style>
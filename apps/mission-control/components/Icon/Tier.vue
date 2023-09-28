<template lang="pug">
.tier-clip(w="1.5 md:2" :class="tierBadgeClass" h="full")
</template>

<script setup lang="ts">

const { getTierColor } = useNFTs()

const tierBadgeClass = computed(() => {
  if (tier == null) {
    return 'is-tier-orange'
  }
  return [tier && `is-tier-${getTierColor(tier)}`]
}
)

const { tier } = defineProps<{
  tier?: string
}>()

</script>

<style>
.tier-clip {
  --clip-v: 1rem;
  --corner-v: 0.05rem;
  --corner-h: 0.15rem;

  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - var(--clip-v)), calc(0% + var(--corner-h)) calc(100% - var(--clip-v) - var(--corner-v)), calc(0% + var(--corner-h)) calc(0% + var(--clip-v) + var(--corner-v)), 0 calc(0% + var(--clip-v)));
}

.tier-clip.is-tier-orange {
  background: #FF6647;
}

.tier-clip.is-tier-gold {
  background: #FFAB00;
}

.tier-clip.is-tier-purple {
  background: #A54BBC;
}

.tier-clip.is-tier-blue {
  background: #4057F8;
}

.tier-clip.is-tier-green {
  background: #009436;
}

.tier-clip.is-tier-white {
  background: #fff;
}
</style>

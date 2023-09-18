<template lang="pug">
.chest-fade(pos="absolute top-50% left-50%" translate-x="-50%" translate-y="-50%" rounded="full" w="10" h="0" z="0")

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

const { getNftTokenKey } = useNFTs()
</script>

<style>
.chest-animation {
  --anim-crate-size-blur: 14rem;
  --anim-crate-size-1: 13rem;
  --anim-crate-size-2: 12rem;
}

.chest-fade {
  --anim-crate-size-blur: 14rem;
  --anim-crate-size-1: 13rem;
  box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-1) rgba(0, 0, 0, 1.0);
}




@media (max-width: 767.9px) {
  .chest-animation {
    --anim-crate-size-blur: 7rem;
    --anim-crate-size-1: 4rem;
    --anim-crate-size-2: 3rem;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.9;
  }
}

@keyframes lighting-cargo-drop {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-1) rgba(255, 102, 71, 0.2)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgba(255, 102, 71, 1)
  }
}

@keyframes lighting-loot-crate {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgba(255, 255, 255, 0.6)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-3) rgba(40, 220, 166, 1)
  }
}

@keyframes lighting-starter-pack {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgba(255, 255, 255, 0.6)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-3) rgba(255, 255, 255, 1)
  }
}


@keyframes lighting-anniversary-pack-mystery {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-1) rgba(255, 171, 0, 0.5)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgba(255, 102, 71, 1)
  }
}

@keyframes lighting-anniversary-pack-outlier {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-1) rgba(255, 255, 255, 0.1)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgba(255, 255, 255, 1)
  }
}

@keyframes lighting-anniversary-pack-common {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-1) rgba(120, 194, 131, 0.1)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgba(120, 194, 131, 1)
  }
}

@keyframes lighting-anniversary-pack-uncommon {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-1) rgba(255, 255, 255, 0.1)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgb(100, 153, 198, 1)
  }
}

@keyframes lighting-anniversary-pack-rare {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-) rgba(255, 255, 255, 0.1)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgb(167, 136, 201, 1)
  }
}

@keyframes lighting-anniversary-pack-legendary {
  from {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-1) rgba(255, 255, 255, 0.1)
  }

  to {
    box-shadow: 0 0 var(--anim-crate-size-blur) var(--anim-crate-size-2) rgb(215, 184, 132, 1)
  }
}

.bg-shade-cargo-drop {
  animation: lighting-cargo-drop 2s ease-in-out alternate infinite;
}

.bg-shade-loot-crate {
  animation: lighting-loot-crate 2s ease-in-out alternate infinite;
}

.bg-shade-starter-pack {
  animation: lighting-starter-pack 2s ease-in-out alternate infinite;
}

.bg-shade-anniversary-pack-mystery {
  animation: lighting-anniversary-pack-mystery 2s ease-in-out alternate infinite;
}

.bg-shade-anniversary-pack-outlier {
  animation: lighting-anniversary-pack-outlier 2s ease-in-out alternate infinite;
}

.bg-shade-anniversary-pack-common {
  animation: lighting-anniversary-pack-common 2s ease-in-out alternate infinite;
}

.bg-shade-anniversary-pack-uncommon {
  animation: lighting-anniversary-pack-uncommon 2s ease-in-out alternate infinite;
}

.bg-shade-anniversary-pack-rare {
  animation: lighting-anniversary-pack-rare 2s ease-in-out alternate infinite;
}

.bg-shade-anniversary-pack-legendary {
  animation: lighting-anniversary-pack-legendary 2s ease-in-out alternate infinite;
}
</style>
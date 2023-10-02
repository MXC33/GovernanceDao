<template lang="pug">
div(space-x="1" flex-center="row" max-w="5" tracking="tighter" items="center" p="x-0.5 y-1")
  IconResource(icon="power" w="1.5 lg:2" h="auto" object="contain")
  div(text="xs lg:sm mc-yellow" h="full" translate-y="0.2") {{ powerMap }}
</template>

<script lang="ts" setup>

const powerMap = computed(() => {
  if(props.type == 'pix') {
    switch (props.tier) {
      case 'outlier': return 1
      case 'common': return 1.2
      case 'uncommon': return 1.5
      case 'rare': return 2
      case 'legendary': return 3
    }
  }
  if(props.type == 'area') {
    switch (props.tier) {
      case 'outlier': return 3
      case 'common': return 3.6
      case 'uncommon': return 4.5
      case 'rare': return 6
      case 'legendary': return 9
    }
  }
  if (props.type == 'sector') {
    switch (props.tier) {
      case 'outlier': return 4
      case 'common': return 4.8
      case 'uncommon': return 6
      case 'rare': return 8
      case 'legendary': return 12
    }
  }
  if (props.type == 'zone') {
    switch (props.tier) {
      case 'outlier': return 5
      case 'common': return 6
      case 'uncommon': return 7.5
      case 'rare': return 10
      case 'legendary': return 15
    }
  }
  if (props.type == 'domain') {
    switch (props.tier) {
      case 'outlier': return 6
      case 'common': return 7.2
      case 'uncommon': return 9
      case 'rare': return 12
      case 'legendary': return 18
    }
  }
})

const props = defineProps<{
  type: string,
  tier: string
}>()

</script>
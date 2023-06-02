<template lang="pug">
VList(justify="center" items="center" aspect="2/3" bg="black opacity-40" ref="mediaElement" cursor="pointer" group)
  CollectionGridItemMedia(:token="token" :is-hovered="isHovered")

  CollectionGridItemMeta(:token="token" :context="context")
    template(#footer)
      Transition(name="slide-bottom")
        button(btn="~ primary" pos="absolute bottom-0 left-0 right-0" v-if="isHovered" @click.stop="onClickButton") {{ buttonCopy }}

      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';

const mediaElement = ref()
const isHovered = useElementHover(mediaElement)

const { addToCart } = useCart()
const { displayPopup } = usePopups()

const { token, context } = defineProps<{
  token: IXToken,
  context?: CollectionContext
}>()

const buttonCopy = computed(() => {
  switch (context) {
    case 'my-assets': return 'List Item'
    default: return 'Add to cart'
  }
})

const onClickButton = () => {
  if (context == 'my-assets')
    return onClickListItems()

  addToCart(token, token.lowest_sale)
}

const onClickListItems = () => {
  displayPopup({
    type: 'list-item',
    items: [token]
  })
}


</script>
<template lang="pug">
VList.collection-grid-item(justify="center" items="center" aspect="2/3" bg="black opacity-40" ref="mediaElement")

  CollectionGridItemMedia(:token="token" :is-hovered="isHovered"  cursor="pointer")

  CollectionGridItemMeta(:token="token" :context="context")
    template(#footer)
      Transition(name="slide-bottom")
        div(pos="absolute bottom-0 left-0 right-0" v-if="isHovered" bg="gray-900" cursor="pointer")
          button(v-if="context == 'my-assets'" btn="~ primary" @click.stop="onClickListItems" w="full" display="on-mobile:none" :mobile="isMobile") 
            GlitchText(text="List Item" :auto-hover="true")

          button(v-else btn="~ primary" @click.stop="onClickCart" w="full" disable="on-no-click:active" :no-click="noClick" display="on-mobile:none" :mobile="isMobile")
            GlitchText(text="Add to cart" :auto-hover="true")
            
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';

const mediaElement = ref()
const isHovered = useElementHover(mediaElement)

const { addToCart, hasItemInCart } = useCart()
const { displayPopup } = usePopups()
const { isMobile } = useDevice()

const { token, context } = defineProps<{
  token: IXToken,
  context?: CollectionContext
}>()

const noClick = computed(() => {
  if (context == 'my-assets')
    return true

  return hasItemInCart(token.lowest_sale)
})

const onClickCart = () => {
  addToCart(token, token.lowest_sale)
}

const onClickListItems = () => {
  displayPopup({
    type: 'list-item',
    items: [token]
  })
}

</script>
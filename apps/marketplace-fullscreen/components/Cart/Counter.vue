<template lang="pug">
div(v-if="cartItems.length" pos="absolute right-(-2) top-(-1)" rounded="full" bg="ix-ne" color="white" text="xs" w="5" h="5" font="bold" flex="~" items="center" justify="center" z="99")
  span(translate-y="0.2") {{ cartItems.length }}
</template>

<script lang="ts" setup>
import { useCart } from "~/composables/useCart";

const { cartItems } = useCart()
</script>

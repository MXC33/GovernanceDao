<template lang="pug">
span(v-if="cartItems.length" pos="absolute right-0 top-0" rounded="full" bg="red-600" text="white sm" w="5" h="5" font="mono" leading="tight" flex="~" items="center" justify="center")
  span() {{ cartItems.length }}
</template>

<script lang="ts" setup>
import { useCart } from "~/composables/useCart";

const { cartItems } = useCart()
</script>

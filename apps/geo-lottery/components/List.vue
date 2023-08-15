<template lang="pug">
div(p="y-6 x-7" bg="$mc-gray-900" )
  div(text="base" m="b-5")
    slot(name="content")

  div(text="base" m="b-4")
    slot(name="enter")
  CheckWarning(:status="true")
  CheckWarning(:status="false")
    template(#warning) You have 0 Territorys.
    template(#nest) Buy one on the marketplace.
</template>

<script lang="ts" setup>
import CheckWarning from "~/components/CheckWarning.vue";

</script>

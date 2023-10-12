<template lang="pug">
VList(bg="black" flex="~ cols-3 space-x-10 items-center space-around")
  div(flex="~ cols-2 gap-12")     
    TitleDetail()
      template(#detail)
        ul(flex="~ col space-x-4")
          li(text="xl") Total Staked:
          li(text="xl" color="white" font="bold") 0
    TitleDetail()
      template(#detail)
        ul(flex="~ col space-x-4")
          li(text="xl") Your Reward:
          li(text="xl" color="white" font="bold") 0
    button(@click="onClick" btn="~ primary-outline" ) Go to {{ id }} staking

</template>

<script lang="ts" setup>


const { id } = defineProps<{
  id: string
}>()

const url = computed(() => {

  switch (id) {
    case "territory":
      return "/territory";
    case "energy":
      return "/energy";
    case "landmark":
      return "/landmark";
    case "metashare":
      return "/metashare";
    default:
      return "";  // default URL or error handling if needed
  }
})

const onClick = () => {
  return navigateTo(url.value)
}
</script>
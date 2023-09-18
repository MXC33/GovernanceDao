<template lang="pug">
VList(items="start")
  HList(items="center" align="center" gap="1")
    VList(align="center" items="center" justify="center" mb="0.5")
      IRIGHT(w="2" h="2")
    HList(font="bold" items="center")
      slot(name="token")

  div()
    slot(name="details")

  HList(items="center" align="center" gap="1")
    TitleWithIcon(icon="cut-corner" fill="on-state-active:red-300 on-state-pending:green-300 yellow-200" :state="status")
      slot(name="status")

</template>

<script lang="ts" setup>
type Status = 'default' | 'active' | 'pending'

defineProps<{
  status: Status
}>()

// const imagePath = computed(() => {
//   switch (props.prompt) {
//     case 'active': return ACTIVE
//     case 'pending': return PENDING
//     case 'default': return DEFAULT
//   }
// })

</script>
<template lang="pug">
Card()
  template(#default)
    HList()
      CardTitle(:large="true" flex-grow="1")
        template(#default)
          slot(name="title")

        template(#subtitle) 
          slot(name="subtitle")

      slot(name="icon")

    slot(name="metadata")

    HList(gap="6")
      Disabler(:disabled="!canWithdraw")
        ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('index.withdrawBtn')")

      Disabler(:disabled="!canDeposit")
        ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('deposit')" :text="$t('index.depositBtn')")

      slot(name="buttons")

  template(#detailBottom)
    slot(name="detail")

</template>


<script lang="ts" setup>
defineEmits(['withdraw', 'deposit'])

defineProps<{
  canWithdraw?: boolean
  canDeposit?: boolean
}>()
</script>
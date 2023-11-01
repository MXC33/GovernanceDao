<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Unstake Landmark
  template(#default) 
    VList(space-y="6")
      InputGroup()
        template(#header) Amount
        template(#default)
          InputText(v-model.number="unstakeAmount" placeholder="Enter amount" type="number" :maxAmount="sharesStaked")
            template(#suffix) {{ $t('general.share', unstakeAmount)  }} 

        template(#detail) Amount staked: {{ sharesStaked }}
        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="unstakeAmount = sharesStaked") Max

      InputGroup()
        template(#header) Landmark
        template(#default) 
          InputReadonly() {{item.token.tokenInfo?.title}}

      InputGroup()
        template(#header) ToC
        template(#default) 
          StakingActionAgreement(v-model="isAgreed")

  template(#footer)
    VList()
      InputSummaryRow()
        template(#name) Landmark
        template(#value) {{item.token.tokenInfo?.title}}

      InputSummaryRow(:primary="true")
        template(#name) Unstake amount
        template(#value) 
          StakingActionTotalAmount(:amount="unstakeAmount" i18n="share")

  template(#buttons)
    Disabler(:disabled="!isAgreed || unstakeAmount == 0")
      ButtonInteractive(@click="onClickUnstake" text="Unstake")

</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';
const { unstakeLandmark } = useLandmarkStakingContract()

const unstakeAmount = ref(0)

const emit = defineEmits(["close"])
const isAgreed = ref(false)

const { item } = defineProps<{
  item: StakingItemFragment
}>()
const { sharesStaked } = useStakingHelper(item)

const onClickUnstake = () => {
  unstakeLandmark(item)
}


</script>
<template lang="pug">
table()
  tr(bg="gray-800" p="6" rounded="xl" b="0.5 white opacity-20" space-y="6") 
    th
      h3.flex Earning overview
      h4.flex My Assets
    th 24h
    th 30 days
  tbody
    tr(b="0.5 white opacity-20")
      td.flex.flex-row.items-center
        IXTIcon(w="10")
        div(text="xl") IXT
      td 0.00
      td 0.00
    tr(b="0.5 white opacity-20")
      td.flex.flex-row.items-center
        EnergyIcon(w="10")
        div(text="xl") Energy
      td 0.00
      td 0.00
    tr(b="0.5 white opacity-20")
      td.flex.flex-row.items-center
        ErrorIcon(w="10")
        div(text="xl") Landmark
      td 0.00
      td 0.00
    tr(b="0.5 white opacity-20")
      td.flex.flex-row.items-center
        ErrorIcon(w="10")
        div(text="xl") Territory
      td 0.00
      td 0.00
    tr(b="0.5 white opacity-20")
      td.flex.flex-row.items-center
        ErrorIcon(w="10")
        div(text="xl") Metashare
      td 0.00
      td 0.00
</template>
  
<script lang="ts" setup>
import IXTIcon from '../../public/assets/svg/tokenBG.svg'
import EnergyIcon from '../../public/assets/svg/EnergySmall.svg'
import LandmarkIcon from '../../public/assets/svg/landmark.svg'
import ErrorIcon from '../../public/assets/svg/error.svg'
import MetashareIcon from '../../public/assets/png/newlands.png'
</script>
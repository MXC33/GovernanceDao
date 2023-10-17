<template lang="pug">
div(b="0.5 white opacity-20 rounded-xl")
  table()
    thead
      tr(class="bg-gray-800 p-6") 
        th
          h3.flex Earning overview
          h4.flex My Assets
        th 24h
        th 30 days
    tbody
      tr
        td.flex.flex-row.items-center
          IXTIcon(class="icon")
          div IXT
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          EnergyIcon(class="icon")
          div Energy
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          LandmarkIcon(class="icon")
          div Landmark
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          TerritoryIcon(class="icon")
          div Territory
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          MetashareIcon(class="icon")
          div Metashare
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          TitleDetail()
            template(#detail)
              div Total 
        td.center 0
          IXTIcon(w="5" class="ml-2")
        td.center 0
          IXTIcon(w="5" class="ml-2")

  </template>
  
  
<script lang="ts" setup>
import IXTIcon from '~/assets/images/tokenBG.svg'
import EnergyIcon from '~/assets/images/EnergySmall.svg'
import LandmarkIcon from '~/assets/images/landmarkSmall1.svg'
import TerritoryIcon from '~/assets/images/mocked-area-img.svg'
import MetashareIcon from '~/assets/images/newlands1.svg'
/* import EnergyIcon from '../../public/assets/svg/EnergySmall.svg'
import LandmarkIcon from '../../public/assets/svg/landmark.svg'
import ErrorIcon from '../../public/assets/svg/error.svg'
</script>

<style>
/* styles.css */

table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  background-color: #00000050;
  /* assuming the background color from your image */
  border-radius: 16px;
  overflow: hidden;
  table-layout: fixed;
  border: 0.5 solid rgba(255, 255, 255, 0.2)
    /* This will ensure the border radius applies to all child elements */
}

th,
td {
  padding: 12px 16px;
  /* adjust as needed */
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
  /* this creates the slight white border in between rows */
}

td.center {
  text-align: center;
}


th {
  font-weight: bold;
}

/* Icons' styles */
.icon {
  width: 40px;
  /* adjust as needed */
  height: 40px;
  margin-right: 12px;
}

/* Last row's bottom border removal */
tbody tr:last-child td {
  border-bottom: none;
}
</style>
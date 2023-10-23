<template lang="pug">
div(b="0.5 white opacity-20 rounded-xl")
  table()
    thead
      tr(class="bg-gray-800 p-6") 
        th
          TitleDetail() 
            template(#default)
              PageParagraphs(section="tableHead")
            template(#detailBottom) 
              PageParagraphs(section="tableAssets")
        th(text="detail xs")
          PageParagraphs(section="tableDays")
        th(text="detail xs")
          PageParagraphs(section="tableMonthly")
    tbody(bg="black")
      tr
        td.flex.flex-row.items-center
          IXTIcon.iconTable()
          div IXT
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          img.iconTable(src="~/assets/png/EnergyIcon.png")
          div Energy
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          img.iconTable(src="~/assets/png/landmarkFinal.png")
          div Landmark
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          img.iconTable(src="~/assets/png/mocked-area-img.png")
          div Territory
        td.center 0.00
        td.center 0.00
      tr
        td.center.flex.flex-row.items-center
          img.iconTable(src="~/assets/png/newlands.png")
          div Metashare
        td.center 0.00
        td.center 0.00
      tr(class="bg-gray-800 p-6")
        td.center.flex.flex-row.items-center
          div(text="detail") 
            PageParagraphs(section="totalEarnings")
        td.center 0
          IXTIcon(w="5" class="ml-2")
        td.center 0
          IXTIcon(w="5" class="ml-2")

  </template>
  
  
<script lang="ts" setup>
import IXTIcon from '~/assets/images/tokenBG.svg'


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
.iconTable {
  width: 25px;
  height: 35px;
  margin-right: 12px;
}

/* Last row's bottom border removal */
tbody tr:last-child td {
  border-bottom: none;
}
</style>
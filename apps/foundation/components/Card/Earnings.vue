<template lang="pug">
Card(style="padding: 10px; border-radius: 8px;")
  HList(grid="~ cols-2")
    TitleDetail()
      template(#detail)
        ul(style="display: flex; justify-content: space-between;" space-x="10")
          li Earnings per day
          li Earnings 7 days
      div(style="display:flex; justify-content: space-between;")
        p 0.00
        p 0.00
  </template>
  
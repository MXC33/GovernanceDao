<template lang="pug">
Card()
  HList(grid="~ cols-2")
    TitleDetail()

      template(#detail)
        ul(style="display: flex; justify-content: space-between;" space-x="3")
          li Earnings per day
          li Earnings 7 day
      div(style="display: flex; justify-content: space-between")
        p 0.00
        p 0.00
  </template>
  
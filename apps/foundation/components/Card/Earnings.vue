<template lang="pug">
Card()
  HList()
    TitleDetail(grid="~ cols-2")
      template(#detail)
        ul(style="list-style-type: none; padding: 0; margin: 0; display: flex; justify-content: space-between;" space-x="3")
          li Earnings per day
          li Earnings 7 day
      div(style="display: flex; justify-content: space-between;")
        p 0.00
        p 0.00
  </template>
  
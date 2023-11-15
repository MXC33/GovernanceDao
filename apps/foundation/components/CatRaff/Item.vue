<template lang="pug">
Card()
  HList(space-x="3")
    div(text="subheading" font="bold" flex-grow="1") 
      slot(name="title")

    div(text="detail" whitespace="nowrap")
      slot(name="counter")

  VList(text="detail")
    slot(name="description")

  VList()
    slot(name="footer")

  </template>
  
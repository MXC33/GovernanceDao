<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="0")
  Header(className="geo-lottery-header")
    template(#logo)
      PlanetIXLogo(w="42.25")

  //- Used for teleports
  div(id="overlays" select="none")

  slot
</template>

<script lang="ts" setup>
import PlanetIXLogo from '~/assets/images/logo.svg'
</script>

<style>
.geo-lottery-header  > div{
  background-color: rgba(255, 30, 110, 1)
}
.geo-lottery-header [btn~="menu"]{
  font-size: 16px;
}
.geo-lottery-header [btn~="menu"]:hover{
  color: black;
}
.geo-lottery-header-mobile > div > div{
  background-color: rgba(255, 30, 110, 0.10);
}
.geo-lottery-header-mobile > div > div::before{
  background-color: white !important;
}
.geo-lottery-header-mobile .border-white, .geo-lottery-header-mobile .border-white > div, .geo-lottery-header-mobile .border-white > div >div {
  border-color: white;
  color: white;
}
.geo-lottery-header-mobile .pink-hover:hover > div > div , .geo-lottery-header-mobile .pink-hover:hover svg path {
  color: #FF1E6E;
  fill: #FF1E6E;
}
.geo-lottery-header-mobile .pink-hover  > div >div {
  color: white;
}
.geo-lottery-header-mobile .pink-hover  > div >div[color~="ix-orange"] {
  color: #FF1E6E;
}
.geo-lottery-header-mobile .pink-text{
  color: #FF1E6E;
}
.geo-lottery-header-mobile .pink-btn{
  color: white;
  background-color: #FF1E6E;
  border-color: transparent;
  cursor: pointer;
}
.geo-lottery-header .hamburger-menu svg path{
  fill: white;
}
.geo-lottery-header .hamburger-menu:hover svg path{
  fill: white;
  opacity: 1;
}
</style>



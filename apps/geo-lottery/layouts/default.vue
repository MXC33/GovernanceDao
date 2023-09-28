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
.geo-lottery-header-header {
  background: black;
}

.geo-lottery-header,
.geo-lottery-header>div:first-child {
  background-color: rgba(255, 30, 110, 1);
}

.geo-lottery-header .border-white-ixt button,
.geo-lottery-header .border-white-ixt {
  border-color: rgba(249, 249, 249, 0.6);
  color: white;
  background-color: #f33076;
  width: 100%;
}

.geo-lottery-header .border-white-ixt button svg,
.geo-lottery-header .border-white-ixt svg {
  fill: white !important;
}

.geo-lottery-header .border-white-ixt button:hover,
.geo-lottery-header .border-white-ixt:hover {
  /*background-color:rgba(249, 249, 249, 0.1);*/
  color: rgba(249, 249, 249, 0.6);
  opacity: 1;
}

.geo-lottery-header .border-white:hover {
  background-color: rgba(132, 212, 188, 0.1);
}


.geo-lottery-header-mobile>div>div::before {
  background-color: white !important;
}

.geo-lottery-header-mobile .border-white,
.geo-lottery-header-mobile .border-white>div,
.geo-lottery-header-mobile .border-white>div>div {
  border-color: white;
  color: white;
}

.geo-lottery-header-mobile .pink-hover:hover>div>div,
.geo-lottery-header-mobile .pink-hover:hover svg path {
  color: #FF1E6E;
  fill: #FF1E6E;
}

.geo-lottery-header-mobile .pink-hover>div>div {
  color: white;
}

.geo-lottery-header-mobile .pink-hover>div>div[color~="ix-orange"] {
  color: #FF1E6E;
}

.geo-lottery-header-mobile .pink-text {
  color: #FF1E6E;
}

.geo-lottery-header-mobile .pink-btn {
  color: white;
  background-color: #FF1E6E;
  border-color: transparent;
  cursor: pointer;
}

.geo-lottery-header .hamburger-menu svg path {
  fill: white;
}

.geo-lottery-header .hamburger-menu:hover svg path {
  fill: white;
  opacity: 1;
}

.geo-lottery-header-desktop .pink-hover:hover>div>div,
.geo-lottery-header-desktop .pink-hover:hover svg path {
  color: #FF1E6E;
  fill: #FF1E6E;
}
</style>



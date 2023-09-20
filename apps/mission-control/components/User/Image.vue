<template lang="pug">
div(flex-center="col")
  div(:class="isMobile ? 'hex-mb' : 'hex'")
    div(:class="isMobile ? 'hex-mb-background' : 'hex-background'")
      //- img(src="@/assets/images/AOC_Silver_Still.png")
</template>

<script setup lang="ts">
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint()
</script>

<style>
/* Code resource: http://jsfiddle.net/zu38qwvj/ */

.hex {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 160px;
  height: 192.12px;
  /* width * 0.866 */
  background: linear-gradient(90deg, rgba(255, 102, 71, 0.4) 22%, rgba(255, 102, 71, 0.7) 70%, rgba(255, 102, 71, 1) 80%);
  box-sizing: border-box;
  -webkit-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  -moz-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
}

.hex-mb {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 200px;
  height: 232.12px;
  /* width * 0.866 */
  background: linear-gradient(90deg, rgba(255, 102, 71, 0.4) 22%, rgba(255, 102, 71, 0.7) 70%, rgba(255, 102, 71, 1) 80%);
  box-sizing: border-box;
  -webkit-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  -moz-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
}

.hex-mb-background {
  position: absolute;
  top: 4px;
  /* equal to border thickness */
  left: 4px;
  /* equal to border thickness */
  width: 192px;
  /* container height - (border thickness * 2) */
  height: 224.12px;
  /* container height - (border thickness * 2) */
  -webkit-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  -moz-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
}

.hex-background {
  position: absolute;
  top: 4px;
  /* equal to border thickness */
  left: 4px;
  /* equal to border thickness */
  width: 152px;
  /* container height - (border thickness * 2) */
  height: 184.12px;
  /* container height - (border thickness * 2) */
  -webkit-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  -moz-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
}

.hex img {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  -webkit-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  -moz-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  object-fit: cover;
}

.hex-mb img {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  -webkit-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  -moz-clip-path: polygon(0 27%, 51% 0, 100% 27%, 100% 76%, 51% 100%, 0 76%);
  object-fit: cover;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>

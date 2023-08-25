<template lang="pug">
VList(class="frameWave")
  <svg class="FrameWaveSVG">
    <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"><path d="M0,0.046 L0.12,0.046 C0.122,0.046,0.124,0.043,0.125,0.037 L0.131,0.009 C0.133,0.003,0.135,0,0.137,0 L0.354,0 C0.356,0,0.358,0.003,0.359,0.009 L0.366,0.037 C0.367,0.043,0.369,0.046,0.371,0.046 L0.518,0.046 C0.52,0.046,0.522,0.043,0.523,0.037 L0.53,0.009 C0.531,0.003,0.533,0,0.535,0 L0.717,0 C0.719,0,0.721,0.003,0.723,0.009 L0.729,0.037 C0.731,0.043,0.732,0.046,0.734,0.046 L0.813,0.046 C0.815,0.046,0.817,0.043,0.818,0.037 L0.825,0.009 C0.826,0.003,0.828,0,0.83,0 L0.993,0 C0.997,0,1,0.014,1,0.031 V0.969 C1,0.986,0.997,1,0.993,1 H0.964 C0.962,1,0.96,0.997,0.959,0.991 L0.952,0.963 C0.951,0.957,0.949,0.954,0.947,0.954 L0.78,0.954 C0.778,0.954,0.776,0.957,0.774,0.963 L0.768,0.991 C0.766,0.997,0.765,1,0.763,1 L0.645,1 C0.643,1,0.641,0.997,0.639,0.991 L0.633,0.963 C0.631,0.957,0.629,0.954,0.628,0.954 H0.472 C0.47,0.954,0.469,0.957,0.467,0.963 L0.461,0.991 C0.459,0.997,0.457,1,0.455,1 L0.357,1 C0.355,1,0.354,0.997,0.352,0.991 L0.346,0.963 C0.344,0.957,0.342,0.954,0.34,0.954 L0.109,0.954 C0.107,0.954,0.106,0.957,0.104,0.963 L0.098,0.991 C0.096,0.997,0.094,1,0.092,1 H0 L0,0.046"></path></clipPath>
  </svg>
  //FrameWaveSVG()
  slot(name="content")



</template>

<script lang="ts" setup>
import ArrowLeft  from '~/assets/icons/arrow-left.svg'
import FrameWaveSVG  from '~/assets/images/FrameWave.svg'
const arrowBackElement = ref()
const isBackHovered = useElementHover(arrowBackElement)

const { hideBackButton } = defineProps<{
  hideBackButton: boolean,
}>()
</script>
<style>
.frameWave {
  width: 100%;
  min-height: 250px;
  padding: 20px;
  background: black;
  background-size: cover;
  -webkit-clip-path: url(#my-clip-path);
  clip-path: url(#my-clip-path);

/*  min-height: 250px;
  background-color: black;
  position: relative;
  margin:  50px 0;*/

}
/*.frameWave:before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  top: -24px;
  height: 24px;
  background-image: url("~/assets/images/pattern2.png");
  background-repeat: repeat-x;
  background-position: left bottom;
}
.frameWave:after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  bottom: -24px;
  height: 24px;
  background-image: url("~/assets/images/pattern.png");
  background-repeat: repeat-x;
  background-position: left bottom;
}*/

.FrameWaveSVG {
  position: absolute;
  width: 0;
  height: 0;
}
</style>

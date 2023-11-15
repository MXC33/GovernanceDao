<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900" mx="lt-md:-4" :disable="!hasDrawer" :is-table="true")
  template(#titleicon)
    TitleWithIcon(icon="listing") {{ $t(`marketplace.singleItem.priceHistory`) }}

  template(#default)
    div(p="4")
      ClientOnly(fallback-tag="span" :fallback="$t(`marketplace.singleItem.priceHistory`)")
        apexchart(height="200" :options="chartRadial" :series="series")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const chartRadial = {
  chart: {
    id: 'area-datetime',
    type: 'bar',
    zoom: {
      type: 'x',
      enabled: false,
      autoScaleYaxis: true
    },
    parentHeightOffset: 0,
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#56897a'],

  yaxis: {
    //show: true
    tickAmount: 3,
    labels: {
      offsetX: -17,
      style: {
        fontFamily: 'Foundry Gridnik',
        fontSize: '12px',
        colors: '#6d7976'
      },
      formatter: (val: number) => {
        return +val.toFixed(1);
      }
    },
  },
  xaxis: {
    type: 'datetime',
    /*min: new Date('23 Jan 2012').getTime(),
    max: new Date('15 Mar 2012').getTime(),*/
    tickAmount: 6,
    axisBorder: {
      show: false,
      offsetX: 0,
      offsetY: 0,
      width: '1%'
    },
    axisTicks: {
      show: false,
    },
    labels: {
      offsetY: 0,
      offsetX: 15,
      style: {
        fontFamily: 'Foundry Gridnik',
        fontSize: '12px',
        colors: '#6d7976'
      },
      format: 'dd/MM',
    },
    tooltip: {
      enabled: false,
    }
  },

  grid: {
    yaxis: {
      lines: {
        show: true,
        height: 1
      }
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  },
  tooltip: {
    fillSeriesColor: false,
    theme: false,
    x: {
      format: 'dd MMM yyyy'
    },
    style: {
      fontSize: '12px',
      fontFamily: 'Foundry Gridnik'
    },
    marker: {
      show: false,
    },
    fixed: {
      enabled: false,
      position: 'topRight',
      offsetX: 0,
      offsetY: 0
    }
  }
}

const series = [{
  name: 'IXT',
  data: [
    [1327359600000, 1.9],
    [1327359600000, 2],
    [1327446000000, 3],
    [1327532400000, 3],
    [1327618800000, 3],
    [1327878000000, 4],
    [1327964400000, 4.5],
    [1328050800000, 4.7],
    [1328137200000, 4.9],
    [1328223600000, 5],
    [1328482800000, 4.4],
    [1328569200000, 5.5],
    [1328655600000, 6],
    [1328742000000, 8],
    [1328828400000, 8],
    [1329087600000, 7.5],
    [1329174000000, 6.5],
    [1329260400000, 5],
    [1329346800000, 5.2],
    [1329433200000, 5.8],
    [1329778800000, 6.2],
    [1329865200000, 6],
    [1329951600000, 6],
    [1330038000000, 7.5],
    [1330297200000, 7.5],
    [1330383600000, 7.5],
    [1330470000000, 8],
    [1330556400000, 8],
    [1330642800000, 8],
    [1330902000000, 8],
    [1330988400000, 8],
    [1331074800000, 8.5],
    [1331161200000, 8.5],
    [1331247600000, 9],
    [1331506800000, 9],
    [1331593200000, 9.5],
    [1331679600000, 10],
    [1331766000000, 10],
    [1331852400000, 10]
  ]
}]

const { t } = useI18n()

const { isMobile } = useDevice()

const { item } = defineProps<{
  item: SingleItemData,
  hasDrawer?: boolean
}>()

</script>
<style>
.apexcharts-tooltip {
  background-color: #27272a;
  border-radius: 0px;
  box-shadow: 0px 0px 0px 0px transparent;
}
.apexcharts-tooltip-title {
  padding: 8px 16px 0 16px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  text-transform: uppercase;
}
.apexcharts-tooltip-series-group {
  padding: 0 16px;
}
.apexcharts-tooltip-text {
  text-align: center;
  margin: 0 auto;
  margin-top: -18px;
  font-size: 18px !important;
}
.apexcharts-tooltip-text-y-label {
  display: none;
}
.apexcharts-tooltip-y-group {
  padding: 0px 0 5px 0;
}
.apexcharts-menu {
  background-color: #27272a;
  border: 0px solid transparent;
  border-radius: 0px;
  right: 6px;
  padding: 0;
  margin-top: 5px;
}
.apexcharts-menu-item:hover {
  background-color: #1d1d1d !important;
}
.apexcharts-xaxistooltip {
  background: #1d1d1d;
  border-radius: 0px;
  color: #f9f9f9;
  border: 1px solid rgba(19, 224, 104, 0.1);
}
.apexcharts-xaxistooltip:before {
  /*border-color: $white1;
  */
  border-bottom-color: rgba(19, 224, 104, 0.1);
}
.apexcharts-xaxistooltip:after {
  border-bottom-color: #1d1d1d;
}

</style>

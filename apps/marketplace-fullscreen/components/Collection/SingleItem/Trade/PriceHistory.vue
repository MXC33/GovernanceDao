<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900" mx="lt-md:-4" :disable="!hasDrawer" :is-table="true")
  template(#titleicon)
    TitleWithIcon(icon="listing") {{ $t(`marketplace.singleItem.priceHistory`) }}

  template(#default)
    div(p=4)
      ClientOnly(fallback-tag="span" :fallback="$t(`marketplace.singleItem.priceHistory`)" v-if="priceHistory && priceHistory[0].data.length > 0" )
        apexchart(height="160" width="100%" :options="chartRadial" :series="priceHistory" )

      VList(w="full" items="center" v-else)
        HelperLoader()

</template>

<script lang="ts" setup>
import {usePriceHistoryAPI} from "~/composables/api/get/useAssetAPI";

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
  plotOptions: {
    bar: {
      borderRadius: 0,
      columnWidth: '3px',
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['transparent']
  },

  yaxis: {
    tickAmount: 2,
    labels: {
      offsetX: -17,
      style: {
        fontFamily: 'Foundry Gridnik',
        fontSize: '12px',
        colors: 'rgba(249, 249, 249, 0.4)'
      },
      formatter: (val: number) => {
        return +val.toFixed(1);
      }
    },

  },
  xaxis: {
    type: 'datetime',
    tickAmount: 6,
    axisBorder: {
      show: false,
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
        colors: 'rgba(249, 249, 249, 0.4)'
      },
      format: 'dd/MM',
    },
    tooltip: {
      enabled: false,
    },
    crosshairs: {
      show: false,
    }
  },

  grid: {
    borderColor: '#333333',
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
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
      format: 'dd MMM yyyy',
    },
    y: {
      formatter: (val: number) => {
        return +val.toFixed(3) + ' IXT';
      }
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

const route = useRoute()
const { network, tokenId, contract } = route.params
const { data: priceHistory, execute: fetchPriceHistory } = await usePriceHistoryAPI({
  contract: String(contract),
  network: String(network),
  tokenId: String(tokenId)
})

fetchPriceHistory()

const { t } = useI18n()

const { isMobile } = useDevice()

defineProps<{
  hasDrawer?: boolean
}>()

</script>
<style>
.apexcharts-tooltip {
  background-color: #27272a !important;
  border-radius: 0px !important;
  box-shadow: 0px 0px 0px 0px transparent !important;
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
  font-size: 16px !important;
}
.apexcharts-tooltip-text-y-label {
  display: none;
}
.apexcharts-tooltip-y-group {
  padding: 0px 0 5px 0;
}


</style>

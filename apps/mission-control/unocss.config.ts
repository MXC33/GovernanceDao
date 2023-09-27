import { defineConfig } from 'unocss'

import baseLayer from '@ix/base/unocss.config';

export default defineConfig({
  presets: [baseLayer],

  theme: {
    //@ts-ignore
    ...baseLayer.theme.colors,
    fontFamily: {
      apercu: ['Apercu Mono', 'sans-serif'],
      druk: ['Druk Wide', 'sans-serif'],
    },

    textShadow: {
      'white': '0px 0px 6px rgba(255, 255, 255, 0.33)',
      'mc-mint': '0px 0px 6px #84D4BC',
      'mc-orange': '0px 0px 6px rgba(255, 102, 71, 0.5)',
      'mc-yellow': '0px 0px 6px #F6BA1E',
      'mc-blue': '0px 0px 6px #0E84D9',
      'mc-ygreen': '0px 0px 6px rgba(95, 190, 135, 0.5)',
      'mc-red': '0px 0px 6px rgba(229, 36, 36, 0.5)',
      'mc-success': '0px 0px 6px rgba(20, 199, 92, 0.5)',
      'gray_light': '0px 0px 6px rgba(249, 249, 249, 0.5)',
      'gray': '0px 0px 6px rgba(249, 249, 249, 0.5)',
      'mc-black': '0px 0px 6px rgba(12, 12, 12, 0.5)',
      'mc-whitenew': '0px 0px 6px rgba(249, 249, 249, 0.5)',
      'mc-warning': '0px 0px 6px rgba(246, 186, 30, 0.5)',
      'mc-arcade': '0px 0px 6px rgba(189, 255, 0, 0.5)',
      'mc-gravity-grade': '0px 0px 6px rgba(255, 65, 0, 0.5)'
    },
    colors: {
      ix: {
        primary: '#84D4BC',
        white: '#F9F9F9',
        black: '#0C0C0C',
        ne: '#FF0014',
        orange: '#FF6647',
        mint: '#84D4BC'
      },
      gray: {
        50: '#d9d9d9',
        100: '#C4C4C4',
        200: '#A8A8A8',
        300: '#858585',
        400: '#636363',
        500: '#474747',
        600: '#333333',
        700: '#242424',
        800: '#1A1A1A',
        900: '#141414'
      },
      'mc': {
        'menu-button': '#d9d9d9',
        'menu-button_10': 'rgba(249, 249, 249, 0.1)',
        'menu-button_20': 'rgba(249, 249, 249, 0.2)',
        'menu-button_40': 'rgba(249, 249, 249, 0.4)',
        'menu-button_60': 'rgba(249, 249, 249, 0.6)',
        'menu-button_80': 'rgba(249, 249, 249, 0.8)',
        'gravity-grade': '#FF4100',
        'gravity-grade_10': 'rgba(189, 255, 0, 0.1)',
        'gravity-grade_20': 'rgba(189, 255, 0, 0.2)',
        'gravity-grade_40': 'rgba(189, 255, 0, 0.4)',
        'gravity-grade_60': 'rgba(189, 255, 0, 0.6)',
        'gravity-grade_80': 'rgba(189, 255, 0, 0.8)',
        'arcade': '#BDFF00',
        'arcade_10': 'rgba(189, 255, 0, 0.1)',
        'arcade_20': 'rgba(189, 255, 0, 0.2)',
        'arcade_40': 'rgba(189, 255, 0, 0.4)',
        'arcade_60': 'rgba(189, 255, 0, 0.6)',
        'arcade_80': 'rgba(189, 255, 0, 0.8)',
        'gray-50': '#d9d9d9',
        'gray-100': '#C4C4C4',
        'gray-200': '#A8A8A8',
        'gray-300': '#858585',
        'gray-400': '#636363',
        'gray-500': '#474747',
        'gray-600': '#333333',
        'gray-700': '#242424',
        'gray-800': '#1A1A1A',
        'black': '#0C0C0C',
        'black_rgb': 'rgba(12, 12, 12, 1)',
        'accent': '#FF6647',
        'orange': '#FF6647',
        'orange_dark': '#69372C',
        'orange_darker': '#3B1D17',
        'orange_darkest': '#1B1011',
        'orange_10': 'rgba(255, 102, 71, 0.1)',
        'orange_20': 'rgba(255, 102, 71, 0.2)',
        'orange_40': 'rgba(255, 102, 71, 0.4)',
        'orange_60': 'rgba(255, 102, 71, 0.6)',
        'orange_80': 'rgba(255, 102, 71, 0.8)',
        'success': '#14C75C',
        'success_10': 'rgba(20, 199, 92, 0.1)',
        'success_20': 'rgba(20, 199, 92, 0.2)',
        'success_40': 'rgba(20, 199, 92, 0.4)',
        'success_60': 'rgba(20, 199, 92, 0.6)',
        'success_80': 'rgba(20, 199, 92, 0.8)',
        'ygreen': 'rgba(95, 190, 135, 1)',
        'ygreen_10': 'rgba(95, 190, 135, 0.1)',
        'ygreen_20': 'rgba(95, 190, 135, 0.2)',
        'ygreen_40': 'rgba(95, 190, 135, 0.4)',
        'ygreen_60': 'rgba(95, 190, 135, 0.6)',
        'ygreen_80': 'rgba(95, 190, 135, 0.8)',
        'white_solid_40': 'rgb(102, 102, 102)',
        'warning': '#F6BA1E',
        'warning_10': 'rgba(246, 186, 30, 0.1)',
        'warning_20': 'rgba(246, 186, 30, 0.2)',
        'warning_40': 'rgba(246, 186, 30, 0.4)',
        'warning_60': 'rgba(246, 186, 30, 0.6)',
        'warning_80': 'rgba(246, 186, 30, 0.8)',
        'red': '#E52424',
        'red_10': 'rgba(229, 36, 36, 0.1)',
        'red_20': 'rgba(229, 36, 36, 0.2)',
        'red_40': 'rgba(229, 36, 36, 0.4)',
        'red_60': 'rgba(229, 36, 36, 0.6)',
        'red_80': 'rgba(229, 36, 36, 0.8)',
        'mint': '#84D4BC',

        'mint_dark': '#425F57',
        'mint_darker': '#31403D',
        'mint_10': 'rgba(132, 212, 188, 0.1)',
        'mint_20': 'rgba(132, 212, 188, 0.2)',
        'mint_40': 'rgba(132, 212, 188, 0.4)',
        'mint_60': 'rgba(132, 212, 188, 0.6)',
        'mint_80': 'rgba(132, 212, 188, 0.8)',
        'secondary_solid_20': '#253430',
        'secondary_solid_40': '#3c5b53',
        'yellow': '#F6BA1E',
        'yellow_10': 'rgba(246, 186, 30, 0.1)',
        'yellow_20': 'rgba(246, 186, 30, 0.2)',
        'yellow_40': 'rgba(246, 186, 30, 0.4)',
        'yellow_60': 'rgba(246, 186, 30, 0.6)',
        'blue': '#0E84D9',
        'white': '#f9f9f9',
        'white_10': 'rgba(249, 249, 249, 0.1)',
        'white_20': 'rgba(249, 249, 249, 0.2)',
        'white_40': 'rgba(249, 249, 249, 0.4)',
        'white_50': 'rgba(249, 249, 249, 0.5)',
        'white_60': 'rgba(249, 249, 249, 0.6)',
        'white_80': 'rgba(249, 249, 249, 0.8)',
        'black_20': 'rgba(12, 12, 12, 0.2)',
        'black_bg_mobile': '#0C0C0C',
        'gws': '#BBBDBF',
        'astro_credit': '#497CFF',
        'gray': '#1E1E1E',
        'gray_light': '#f9f9f999',
        'gray_50': '#D9D9D9',
        'luckycat': 'rgba(255, 30, 110, 0.6)',
        'newlands': 'rgba(255, 230, 10, 0.6)',
        'eternalab': 'rgba(0, 160, 240, 1)',
        'yspace': 'rgba(0, 255, 182, 1)',
        'error': "#E52424",
        'primary': 'rgb(var(--corporation-accent-color-rgb))',
        'whitenew': 'f9f9f9'
      },

      'tier': {
        'gold': '#FFAB00',
        'purple': '#A54BBC',
        'blue': '#4057F8',
        'green': '#009436',
        'white': '#FFFFFF',
        'orange': '#FF6647',
      },

      'condition': {
        'success': '#14C75C',
        'yellow': '#F6BA1E',
        'red': '#E52424',
      },
    },
  },

  // Good search regex for all btn-accent implementations is
  // btn="[^"]*accent[^"]*"
  // Adjust to needs.

  shortcuts: [
    //@ts-ignore
    ...baseLayer.shortcuts,
    {
      'text-ellipsis': 'text-ellipsis w-[100%] overflow-hidden',
      'inset-0': 'left-0 top-0 right-0 bottom-0',
      'offscreen': 'pos-absolute pos-left--999 opacity-0 h-0',
      'modal': 'bg-mc-orange blur-10',
      'scrollbar-mc': 'scrollbar scrollbar-track-color-transparent scrollbar-thumb-color-$mc-accent scrollbar-h-4px scrollbar-w-4px',
      'flex-center': 'flex justify-center items-center',
      'flex-center-col': 'flex flex-col justify-center items-center',
      'flex-center-row': 'flex flex-row justify-center items-center',
      'flex-start-col': 'flex flex-col justify-start items-center',
      'flex-start-row': 'flex flex-row justify-start items-center',
      'tab': "color-$mc-accent  pr-3.5 md:pr-15 pl-3 py-1 hover:opacity-80",
      'tab-selected': "text-$corporation-over-accent-color bg-$mc-accent",
      'shop-item': 'b-1 b-$mc-accent-20 hover:b-$mc-accent-40 color-$mc-accent cursor-pointer transition-all transition-duration-100',
      'shop-item-selected': 'b-$mc-accent',
      'card': 'b-1 hover:b-1 b-$mc-accent-40 hover:b-$mc-accent bg-$mc-accent-10 hover:bg-$mc-accent-20 color-$mc-accent cursor-pointer transition-all transition-duration-100',
      'card-no-bg': '!bg-transparent',
      'card-active': 'btn-accent b-$mc-accent bg-$mc-accent-20',
      'card-selected': 'b-$mc-secondary_40 hover:b-$mc-secondary bg-$mc-secondary_20  hover:bg-$mc-secondary_40 text-$mc-secondary text-shadow-$mc-secondary',
      'btn-accent': 'b-$mc-accent-40 hover:b-$mc-accent bg-$mc-accent-10 hover:bg-$mc-accent-20 color-$mc-accent cursor-pointer transition-all',
      'btn-accent-filled': 'bg-$mc-accent hover:bg-$mc-accent color-$corporation-over-accent-color hover:opacity-80 b-$mc-accent',
      'btn-accent-outline': 'bg-transparent b-$mc-accent hover:bg-transparent color-$mc-accent hover-opacity-80',
      'btn-card': 'b-$mc-secondary hover:b-$mc-secondary bg-$mc-secondary_40 hover:bg-$mc-secondary_40 text-$mc-whitenew text-shadow-$mc-whitenew',
      'btn-secondary-outline': 'bg-transparent b-$mc-secondary_40 hover:b-$mc-secondary_60 hover:bg-transparent color-$mc-secondary ',
      'btn-tab': 'bg-mc-orange bg-opacity-20 hover:bg-opacity-40 backdrop-blur-lg b-mc-orange b-1 b-opacity-60 color-mc-orange uppercase transition-all font-400 tracking-normal cut-b-mc-orange cut-b-opacity-60',
      'btn-uppercase': 'uppercase',
      'btn-tab-active': 'btn-tab bg-mc-mint color-mc-mint b-mc-mint',
      'icon-button': 'w-8 h-8 cursor-pointer hover:opacity-50" transition-opacity',
      'btn-disable': 'opacity-80 cursor-default pointer-events-none filter-grayscale',
      'btn-inline': 'bg-transparent b-transparent',
      'btn-soft': 'btn px-4 btn-md bg-opacity-20 hover:bg-opacity-40 b-0.5',
      'listitem': 'b-0.5 b-$listitem-base-color hover:b-$listitem-select-color group-hover:b-$listitem-select-color transition-all',

      // 'btn-table-primary': 'btn-primary'
    },

    {
      'scrollbar-primary': 'scrollbar scrollbar-track-color-transparent scrollbar-thumb-color-color-primary scrollbar-h-4px scrollbar-w-4px',
      'scrollable-all': 'overflow-y-auto scrollbar scrollbar-primary min-h-0',
      'scrollable-mobile': 'lt-md-overflow-y-auto lt-md-scrollbar lt-md-scrollbar-primary lt-md-min-h-0',
      'scrollable-desktop': 'md-overflow-y-auto md-scrollbar md-scrollbar-primary md-min-h-0'
    },

    [/^size-(.*)$/, ([, c]) => `w-${c} h-${c}`],
    [/^mc-ring-(\d)$/, ([, c]) => `ring-${c}`],
    [/^mc-ring-hover(\d)$/, ([, c]) => `hover:ring-${c} group-hover:ring-${c}`],
    [/^mc-ring-static-(\d)$/, ([, c]) => `ring-${c} hover:ring-${c} group-hover:ring-${c}`],
    [/^mc-ring-color-(.*)$/, ([, c]) => `ring-${c} hover:ring-${c} group-hover:ring-${c}`],
    [/^wh-(.*)$/, ([, c]) => `w-${c} h-${c}`],
    [/^btn-soft-(.*)$/, ([, c]) => `btn-soft bg-${c} b-${c} color-${c}`],
  ],

  rules: [
    //@ts-ignore
    ...baseLayer.rules,
    ['listitem', {
      '--listitem-base-color': 'var(--gray-200)',
      '--listitem-select-color': 'var(--mc-mint)',
    }],
    ['listitem-selected', {
      '--listitem-base-color': 'var(--listitem-select-color)',
    }],
    ['listitem-accent', {
      '--listitem-select-color': 'var(--mc-accent)'
    }],
    ['listitem-mint', {
      '--listitem-select-color': 'var(--mc-mint)'
    }]
  ]
})
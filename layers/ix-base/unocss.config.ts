import { definePreset } from 'unocss'

import presetAttributify from "@unocss/preset-attributify";
import extractorPug from "@unocss/extractor-pug";
import presetUno from "@unocss/preset-uno"

import { extractorSplit } from "@unocss/core";
import { presetScrollbar } from 'unocss-preset-scrollbar'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { stateOnMatcher, stateMatcher } from './variants.uno';

export default definePreset({
  presets: [
    //@ts-ignore
    presetUno({ attributifyPseudo: true }),
    //@ts-ignore
    presetAttributify({
      ignoreAttributes: ['placeholder']
    }),
    presetScrollbar({}),
  ],
  //@ts-ignore
  transformers: [
    transformerVariantGroup(),
  ],
  extractors: [
    extractorPug(),
    extractorSplit
  ],
  variants: [
    stateOnMatcher,
    stateMatcher
  ],
  theme: {
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
      'mc-finegreen': '0px 0px 6px rgba(20, 199, 92, 0.5)',
      'mc-gray_light': '0px 0px 6px rgba(249, 249, 249, 0.5)',
      'mc-gray': '0px 0px 6px rgba(249, 249, 249, 0.5)',
      'mc-black': '0px 0px 6px rgba(12, 12, 12, 0.5)',
      'mc-whitenew': '0px 0px 6px rgba(249, 249, 249, 0.5)',
      'mc-warning': '0px 0px 6px rgba(246, 186, 30, 0.5)',
      'mc-arcade': '0px 0px 6pc rgba(189, 255, 0, 0.5)'



    },
    colors: {
      gray: {
        50: '#d9d9d9',
        100: '#C4C4C4',
        200: '#A8A8A8',
        300: '#858585',
        400: '#636363',
        500: '#474747',
        600: '#333333',
        700: '#242424',
        800: '#1A1A1A'
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
        'finegreen': '#14C75C',
        'yellow': '#F6BA1E',
        'red': '#E52424',
      },
    },
  },
  shortcuts: [
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
      'tab': "color-$mc-accent  pr-7 md:pr-15 pl-3 py-1 hover:opacity-80",
      'tab-selected': "text-black bg-$mc-accent",
      'shop-item': 'b-1 b-$mc-accent-20 hover:b-$mc-accent-40 color-$mc-accent cursor-pointer transition-all transition-duration-100',
      'shop-item-selected': 'b-$mc-accent',
      'card': 'b-1 hover:b-1 b-$mc-accent-40 hover:b-$mc-accent bg-$mc-accent-10 hover:bg-$mc-accent-20 color-$mc-accent cursor-pointer transition-all transition-duration-100',
      'card-no-bg': '!bg-transparent',
      'card-active': 'btn-accent b-$mc-accent bg-$mc-accent-20',
      'card-selected': 'b-$mc-secondary_40 hover:b-$mc-secondary bg-$mc-secondary_20  hover:bg-$mc-secondary_40 text-$mc-secondary text-shadow-$mc-secondary',
      'btn': 'b-1 hover:b-1 transition-all transition-duration-100  flex-center-col px-4 lg:px-12 py-4 leading-none tracking-widest font-bold uppercase',
      'btn-primary': 'b-mc-mint bg-mc-mint bg-opacity-40 hover:bg-opacity-60',
      'btn-loading-outline': 'bg-$mc-orange_20 hover:bg-$mc-orange_20 color-mc-orange',
      'btn-primary-outline': 'bg-transparent b-mc-mint b-opacity-40 hover:b-opacity-60 hover:bg-transparent color-mc-mint',
      'btn-accent': 'b-$mc-accent-40 hover:b-$mc-accent bg-$mc-accent-10 hover:bg-$mc-accent-20 color-$mc-accent cursor-pointer transition-all',
      'btn-accent-filled': 'bg-$mc-accent hover:bg-$mc-accent color-$corporation-over-accent-color hover:opacity-80 b-$mc-accent',
      'btn-accent-outline': 'bg-transparent b-$mc-accent hover:bg-transparent color-$mc-accent hover-opacity-80',
      'btn-fixed-width': 'min-w-50',
      'btn-accent-active': 'btn-accent b-$mc-accent bg-$mc-accent-20',
      'btn-white': 'b-white b-opacity-20 hover:b-opacity-40 bg-gray-500 hover:bg-gray-400 text-white text-opacity-80',
      'btn-secondary': 'b-$mc-secondary_40 hover:b-$mc-secondary bg-$mc-secondary_20  hover:bg-$mc-secondary_40 text-$mc-secondary text-shadow-$mc-secondary',
      'btn-card': 'b-$mc-secondary hover:b-$mc-secondary bg-$mc-secondary_40 hover:bg-$mc-secondary_40 text-$mc-whitenew text-shadow-$mc-whitenew',
      'btn-secondary-solid': 'btn-secondary bg-mc-secondary_solid_20  hover:bg-mc-secondary_solid_40',
      'btn-secondary-outline': 'bg-transparent b-$mc-secondary_40 hover:b-$mc-secondary_60 hover:bg-transparent color-$mc-secondary ',
      'btn-secondary-active': 'btn-secondary b-1 b-$mc-secondary',
      'btn-corporation': 'b-$mc-accent',
      'btn-lg': 'min-h-14',
      'btn-tab': 'bg-mc-orange bg-opacity-20 hover:bg-opacity-40 backdrop-blur-lg b-mc-orange b-1 b-opacity-60 color-mc-orange uppercase transition-all font-400 tracking-normal',
      'btn-uppercase': 'uppercase',
      'btn-tab-active': 'btn-tab bg-mc-mint color-mc-mint b-mc-mint',
      'btn-subtab': 'btn-accent b-0 transition-all backdrop-blur-lg hover:b-0',
      'btn-subtab-active': 'btn-subtab btn-secondary ring-0 hover:ring-0',
      'icon-button': 'w-8 h-8 cursor-pointer hover:opacity-50" transition-opacity',
      'btn-disable': 'opacity-80 cursor-default pointer-events-none filter-grayscale',
      'pickable': 'transition-all on-active:!b-mc-mint_60 b-white b-opacity-20 hover:b-opacity-40',
      'btn-inline': 'bg-transparent b-transparent',
      'pickable-active': 'pickable bg-black bg-opacity-40',
      'scrollable-all': 'overflow-y-auto scrollbar scrollbar-mc min-h-0',
      'scrollable-mobile': 'lt-md-overflow-y-auto lt-md-scrollbar lt-md-scrollbar-mc lt-md-min-h-0',
      'scrollable-desktop': 'md-overflow-y-auto md-scrollbar md-scrollbar-mc md-min-h-0'
    },



    [/^cut-b-(.*)$/, ([, c]) => `before:bg-${c}`],
    [/^size-(.*)$/, ([, c]) => `w-${c} h-${c}`],
    [/^mc-ring-(\d)$/, ([, c]) => `ring-${c}`],
    [/^mc-ring-hover(\d)$/, ([, c]) => `hover:ring-${c} group-hover:ring-${c}`],
    [/^mc-ring-static-(\d)$/, ([, c]) => `ring-${c} hover:ring-${c} group-hover:ring-${c}`],
    [/^mc-ring-color-(.*)$/, ([, c]) => `ring-${c} hover:ring-${c} group-hover:ring-${c}`]
  ],
})
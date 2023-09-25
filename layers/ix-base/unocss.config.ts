import { definePreset } from 'unocss'

import presetAttributify from "@unocss/preset-attributify";
import extractorPug from "@unocss/extractor-pug";
import presetUno from "@unocss/preset-uno"

import { extractorSplit } from "@unocss/core";
import { presetScrollbar } from 'unocss-preset-scrollbar'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { stateOnMatcher, stateMatcher } from './variants.uno';
import { cutRules, frameRules } from './cuts.uno'

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
      foundry: ['Foundry Gridnik', 'sans-serif'],
    },
    colors: {
      ix: {
        primary: '#C3000F',
        white: '#F9F9F9',
        black: '#0C0C0C',
        ne: '#FF0014',
        orange: '#FF6647',
        mint: '#84D4BC',
        pink: '#FF1E6E',
        yellow: '#FFF61E',
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

      'tier': {
        'gold': '#FFAB00',
        'purple': '#A54BBC',
        'blue': '#4057F8',
        'green': '#009436',
        'white': '#FFFFFF',
        'orange': '#FF6647',
      },

      'semantic': {
        'success': '#14C75C',
        'warning': '#F6BA1E',
        'red': '#E52424',
      },
    },
  },

  // Searching in all files for style implementation by using:
  // btn="[^"]*center[^"]*" 

  shortcuts: [
    // general shortcuts
    {
      'text-ellipsis': 'text-ellipsis w-[100%] overflow-hidden',
      'inset-0': 'left-0 top-0 right-0 bottom-0',
      'offscreen': 'pos-absolute pos-left--999 opacity-0 h-0',
      'modal': 'bg-mc-orange blur-10',
      'pos-absolute-center': 'pos-absolute pos-left-50% pos-top-50% translate-x--50% translate-y--50%',
      'disable-active': 'pointer-events-none opacity-20 cursor-default backdrop-blur-md',
      'flex-fold-row': 'flex-s-md:lt-md:flex-row s-lg:lt-md:flex-row',
      'flex-fold-col': 's-md:lt-md:flex-col s-lg:lt-md:flex-col',
    },

    // Base button styles
    {
      'btn': 'transition-all transition-duration-150 flex flex-col text-center justify-center items-center leading-none cursor-pointer font-bold uppercase btn-md px-4',
      'btn-primary': 'bg-ix-primary hover:bg-ix-primary color-white',
      'btn-secondary': 'bg-gray-600 color-white hover:bg-gray-400',
      'btn-secondary-detail': 'btn-md bg-gray-500 hover:bg-gray-400 cut-bottom-right cut-sm btn-center',
      'btn-tertriary': 'b-1 b-gray-400 hover:b-gray-300',
      'btn-select': 'cut-bottom-right cut-b-gray-400 hover:cut-b-gray-300',
      'btn-select-active': 'bg-gray-500 cut-b-gray-300',
      'btn-form': 'font-400 py-3 px-1 btn-select',
      'btn-form-active': 'bg-gray-600',
      'btn-accent': 'btn-primary',
    },

    // Special button
    {
      'btn-soft': 'btn px-4 btn-md bg-opacity-20 hover:bg-opacity-40 b-0.5',
      'btn-table': 'font-bold uppercase px-4 lg:px-6 py-3',
      'btn-menu': 'opacity-100 hover:opacity-80 transition-opacity font-bold uppercase whitespace-nowrap p-1',
    },

    // Button modifiers
    {
      'btn-disabled': 'bg-gray-700 color-gray-400',
      'btn-center': 'flex justify-center items-center',
      'btn-primary-outline': 'btn-primary bg-opacity-20 hover:bg-opacity-40 b-0.5 b-ix-primary',
      'btn-primary-outline-opaque': 'btn-primary-outline bg-opacity-40 hover:bg-opacity-60',
      'btn-lg': 'min-h-14',
      'btn-md': 'min-h-12',
      'btn-sm': 'min-h-10',
      'btn-xs': 'min-h-8',
    },

    {
      'scrollbar-primary': 'scrollbar scrollbar-track-color-transparent scrollbar-thumb-color-color-primary scrollbar-h-4px scrollbar-w-4px',
      'scrollable-all': 'overflow-y-auto scrollbar scrollbar-primary min-h-0',
      'scrollable-mobile': 'lt-md-overflow-y-auto lt-md-scrollbar lt-md-scrollbar-primary lt-md-min-h-0',
      'scrollable-desktop': 'md-overflow-y-auto md-scrollbar md-scrollbar-primary md-min-h-0'
    },

    [/^wh-(.*)$/, ([, c]) => `w-${c} h-${c}`],
    [/^btn-soft-(.*)$/, ([, c]) => `btn-soft bg-${c} b-${c} color-${c}`],
  ],
  rules: [
    ...cutRules,
    ...frameRules
  ]
})

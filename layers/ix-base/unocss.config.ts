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
    colors: {
      ix: {
        primary: '#D70011',
        black: '#0C0C0C'
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
        'finegreen': '#14C75C',
        'warning': '#F6BA1E',
        'red': '#E52424',
      },
    },
  },
  shortcuts: [
    // general shortcuts
    {
      'text-ellipsis': 'text-ellipsis w-[100%] overflow-hidden',
      'inset-0': 'left-0 top-0 right-0 bottom-0',
      'offscreen': 'pos-absolute pos-left--999 opacity-0 h-0',
      'modal': 'bg-mc-orange blur-10',
      'pos-absolute-center': 'pos-absolute pos-left-50% pos-top-50% translate-x--50% translate-y--50%',
      'disable-active': 'pointer-events-none opacity-20 cursor-default'
    },

    {
      'btn': 'transition-all transition-duration-100 flex flex-col text-center justify-center items-center leading-none cursor-pointer',
      'btn-solid': 'font-bold uppercase px-4 lg:px-12 py-4',
      'btn-accent': 'btn-primary btn-solid',
      'btn-primary': 'btn-solid bg-ix-primary color-white',
      'btn-secondary': 'btn-solid bg-gray-600 color-white',
      'btn-form': 'font-400 p-3 cut-bottom-right cut-b-gray-400 hover:cut-b-gray-300',
    },

    {
      'scrollbar-primary': 'scrollbar scrollbar-track-color-transparent scrollbar-thumb-color-color-primary scrollbar-h-4px scrollbar-w-4px',
      'scrollable-all': 'overflow-y-auto scrollbar scrollbar-primary min-h-0',
      'scrollable-mobile': 'lt-md-overflow-y-auto lt-md-scrollbar lt-md-scrollbar-primary lt-md-min-h-0',
      'scrollable-desktop': 'md-overflow-y-auto md-scrollbar md-scrollbar-primary md-min-h-0'
    },

    [/^size-(.*)$/, ([, c]) => `w-${c} h-${c}`]
  ],
  rules: [
    ...cutRules,
    ...frameRules
  ]
})

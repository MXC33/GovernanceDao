import { defineConfig } from 'unocss'

import presetAttributify from "@unocss/preset-attributify";
import extractorPug from "@unocss/extractor-pug";
import presetUno from "@unocss/preset-uno"
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { stateMatcher, stateOnMatcher } from './variants.uno';
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({

  presets: [
    //@ts-ignore
    presetUno({ attributifyPseudo: true }),
    //@ts-ignore
    presetAttributify({
      ignoreAttributes: ['placeholder']
    }),
    // presetScrollbar({}),
  ],
  //@ts-ignore
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  variants: [
    stateOnMatcher,
    stateMatcher
  ],
  extractors: [
    extractorPug(),
    // extractorSplit
  ],
  theme: {
    fontFamily: {
      prime: 'Courier Prime',
      bdr: 'BDR Mono',
      bdra: 'BDRA3MiK-Regular'
    },
    fontSize: {
      'xs': ['var(--font-size-xs)', '1rem'],
      'sm': ['var(--font-size-sm)', '1.25rem'],
      'base': ['var(--font-size-base)', '1.5rem'],
      'lg': ['var(--font-size-lg)', '1.75rem'],
      'xl': ['var(--font-size-xl)', '1.75rem'],
      '2xl': ['var(--font-size-2xl)', '2rem'],
      '3xl': ['var(--font-size-3xl)', '2.25rem'],
      '4xl': ['var(--font-size-4xl)', '2.5rem'],
      '5xl': ['var(--font-size-5xl)', '1'],
      '6xl': ['var(--font-size-6xl)', '1'],
      '7xl': ['var(--font-size-7xl)', '1'],
      '8xl': ['var(--font-size-8xl)', '1'],
      '9xl': ['var(--font-size-9xl)', '1'],
    },
    colors: {
      pink: "#FF1E6E",
      mint: "#2EBD85"
    },
  },
  shortcuts: [{
    'pos-absolute-center': 'pos-absolute left-50% top-50% translate-x--50% translate-y--50%',
    'pos-image': 'pos-absolute inset-0 w-full h-full object-cover'
  }]
})
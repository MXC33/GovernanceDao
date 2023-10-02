import { defineConfig } from 'unocss'
import baseLayer from '@ix/base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    fontFamily: {
      foundry: ['Foundry Gridnik', 'sans-serif'],
    },
    boxShadow: {
      right: '7px 0px 4px 0px #000',
      left: '-4px 0px 4px 0px #000',
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
      //@ts-ignore
      ...baseLayer.theme.colors,
      corp: {
        ne: '#FF0014'
      }
    },
    shortcuts: [
      //@ts-ignore
      ...baseLayer.shortcuts,
      {
        'pos-absolute-center': 'pos-absolute left-50% top-50%',
        'btn-secondary-detail': 'btn-md bg-gray-500 hover:bg-gray-400 cut-bottom-right cut-sm btn-center',

      }
    ]
  }
})
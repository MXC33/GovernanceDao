import { defineConfig } from 'unocss'
import baseLayer from '../../layers/ix-base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    fontFamily: {
      foundry: ['Foundry Gridnik', 'sans-serif'],
    },

    colors: {
      //@ts-ignore
      ...baseLayer.theme.colors,
      ix: {
        primary: '#FF6647'
      },
    }
  }
})
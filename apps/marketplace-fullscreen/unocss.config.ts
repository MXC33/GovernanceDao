import { defineConfig } from 'unocss'
import layer from '../../layers/ix-base/unocss.config';

export default defineConfig({
  presets: [layer],
  theme: {
    fontFamily: {
      foundry: ['Foundry Gridnik', 'sans-serif'],
    },

    colors: {
      ix: {
        primary: '#FF6647'
      },
    }
  }
})
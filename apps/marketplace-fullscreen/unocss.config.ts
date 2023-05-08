import { defineConfig } from 'unocss'
import baseLayer from '../../layers/ix-base/unocss.config';
import ixUILayer from '../../layers/ix-ui-planetix/unocss.config';

export default defineConfig({
  presets: [baseLayer, ixUILayer],
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
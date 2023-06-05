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
        primary: '#C3000F',
        white: '#F9F9F9'
      },
      corp: {
        ne: '#FF0014'
      }
    },
    shortcuts: [
      //@ts-ignore
      ...baseLayer.shortcuts,
      {
        'pos-absolute-center': 'pos-absolute left-50% top-50%'
      }
    ]
  }
})
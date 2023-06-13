import { defineConfig } from 'unocss'
import baseLayer from '@ix/base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    fontFamily: {
      foundry: ['Foundry Gridnik', 'sans-serif'],
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
        'pos-absolute-center': 'pos-absolute left-50% top-50%'
      }
    ]
  }
})
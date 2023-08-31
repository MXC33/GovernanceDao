import { defineConfig } from 'unocss'
import baseLayer from '../../layers/ix-base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    fontFamily: {
      foundry: ['Foundry Gridnik'],
      blender: ['BlenderPro-Bold'],
      bdrA3mik: ['BDRA3MiK-Regular'],
    },

    colors: {
      //@ts-ignore
      ...baseLayer.theme.colors,
      ix: {
        primary: '#CB0010',
      },
      corp: {
        ne: '#CB0010'
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

import { defineConfig } from 'unocss'
import baseLayer from '@ix/base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    ...baseLayer.theme,
    boxShadow: {
      right: '7px 0px 4px 0px #000',
      left: '-4px 0px 4px 0px #000',
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
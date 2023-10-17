import { defineConfig } from 'unocss'
import baseLayer from '@ix/base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    ...baseLayer.theme
  },
  shortcuts: [
    //@ts-ignore
    ...baseLayer.shortcuts,
    {
      'text-detail': 'text-xs color-gray-300',
      'text-subheading': 'text-lg font-bold',
    }
  ]
})
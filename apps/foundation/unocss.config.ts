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
      'text-heading': 'text-3xl font-bold',
      'grid-gap-default': 'grid-gap-4 md:grid-gap-6',
      'gap-default': 'gap-4 md:gap-6',
      'space-y-default': 'space-y-4 md:space-y-6'
    }
  ]
})
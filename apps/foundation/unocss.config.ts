import { defineConfig } from 'unocss'
import baseLayer from '@ix/base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    ...baseLayer.theme
  }
})
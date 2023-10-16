import { defineConfig } from 'unocss'
import baseLayer from '@ix/base/unocss.config';

export default defineConfig({
  presets: [baseLayer],
  theme: {
    ...baseLayer.theme,
    colors: {
      //@ts-ignore
      ...baseLayer.theme.colors,
      ix: {
        //@ts-ignore
        ...baseLayer.theme.colors.ix,
        primary: "#FF6647"
      }
    },
  }
})
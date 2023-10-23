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
  },
  shortcuts: [
    //@ts-ignore
    ...baseLayer.shortcuts,
    {
      "text-detail": "color-gray-200 text-sm",
      "text-detail-value": "color-white text-sm font-bold",
      "text-subheading": "color-white text-lg font-bold",
    }
  ]
})
import { definePreset } from 'unocss'

export default definePreset({
  //@ts-ignore
  transformers: [],
  theme: {
    colors: {
      ix: {
        primary: '#D70011',
        black: '#0C0C0C'
      },
    }
  },
  shortcuts: [
    {
      'btn-primary': 'bg-ix-primary color-blue'
    },

  ]
})

import { Carousel, Slide } from 'vue3-carousel'

export default defineNuxtPlugin((nuxtApp) => {

  return {

    provide: {
      Carousel,
      Slide
    }
  }
})
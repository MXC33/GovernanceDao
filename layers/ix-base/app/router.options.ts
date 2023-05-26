import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      nuxtApp.hook('page:finish', () => {

        if (savedPosition)
          return resolve(savedPosition)
        resolve({
          top: 0,
        })
      })
    })
  }
}
import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  scrollBehavior(to, from, savedPosition) {
    console.log('scroll behavior function fired');
    const nuxtApp = useNuxtApp();

    return new Promise((resolve) => {
      nuxtApp.hook('page:finish', () => {
        console.log('page loaded');

        if (savedPosition) {
          return resolve(savedPosition)
        }

        resolve({
          top: 0,
        });
      });
    });
  },
}
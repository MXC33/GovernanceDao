export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path == '/')
    return navigateTo('/assets/polygon/0xba6666b118f8303f990f3519df07e160227cce87')

  return true
})

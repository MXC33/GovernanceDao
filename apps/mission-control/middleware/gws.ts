export default defineNuxtRouteMiddleware(async (to, from) => {
  return navigateTo(`/gws`)
})
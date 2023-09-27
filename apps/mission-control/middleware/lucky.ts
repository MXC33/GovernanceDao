export default defineNuxtRouteMiddleware(async (to, from) => {
  return navigateTo(`/lucky-cat`)
})
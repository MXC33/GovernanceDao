export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig().public
    const response = await $fetch(`${config.apiEndpoint}/cachebust-avatar`, {
        method: `POST`,
        body,
        headers: { 'Content-Type': 'application/json' }
    })
    return { response }
})
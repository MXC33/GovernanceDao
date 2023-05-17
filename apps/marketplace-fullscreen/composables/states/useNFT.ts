export const useNFT = () => {

    const config = useRuntimeConfig();

    console.log('fisky config.public.API_BASE_URL', config.public.API_BASE_URL)

    const getNFT = async (body: { slug: string, network: string, collection: string, token_id: number, user_id: number }) =>
        await $fetch('/collections/'+ body.slug +'/nfts/'+ body.network +'/'+ body.collection +'/'+ body.token_id, {
            baseURL: config.public.API_BASE_URL,
            /*method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }*/
        })

    return {
        getNFT
    }

}
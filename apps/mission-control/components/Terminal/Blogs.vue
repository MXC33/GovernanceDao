<template lang="pug">
VList(bg="mc-orange_10" b="1 mc-orange_40")
  header(text="mc-orange" uppercase="~" b="b-1 mc-orange_40" p="3" flex="shrink-0") {{$t(`layouts.headers.automatedTrans`)}}

  ul(text="white" divide-y="1" min-h="0" overflow-y="auto" scrollbar="~ mc")
    li(v-for="blog in blogs" p="3" b="mc-orange_40" flex="~ row"  space-x="2" cursor="pointer" opacity="hover:80" @click="gotoBlog(blog)") 
      div(flex="grow") {{ blog.title }}
      div(text="white opacity-40 xs md:base") {{ readableDate(blog.created) }}

</template>


<script lang="ts" setup>
import { format } from 'date-fns'
import type { IXBlog } from '~~/composables/useMcIXAPI';
const { ixBlogs } = useMcIXAPI()

const gotoBlog = (blog: IXBlog) => {
  const BLOG_BASE_URL = 'https://planetix.com/comms'
  window.open(`${BLOG_BASE_URL}/${blog.slug}`)
}
const readableDate = (date: string) => format(new Date(date), 'MM/dd/yyyy')

const { data: blogs } = ixBlogs() 
</script>

<style></style>
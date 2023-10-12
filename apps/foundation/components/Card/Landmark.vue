<template lang="pug"> 
div(grid="~ cols-3 gap-6" flex-grow)
  VList(v-for="item in titlar" :key="item.title" h="full")
    Card(rounded="tl tr")
      h1(text="5xl") IMAGE
    Card(bg="black" rounded="bl br" flex-grow)
      VList(flex-grow )
        TitleDetail()
          template(#default ) {{ item.title }}
        HList()
          TitleDetail()
            template(#detail) 
              ul(grid="~ cols-3")
                li() shares
                li() owners
                li() earning diameter
            TitleDetail()
              template(#default) 
                ul(grid="~ cols-3")
                  li() 0
                  li() NA
                  li() 100
      button(btn="~ primary-outline") iew
</template>
  
<script lang="ts" setup>

interface Titles {
  title: string
}

const titlar: Titles[] = [{
  title: "Monumental Arch of a Faux-Celestial",
},
{
  title: "Sealed Structure of Communion's Wake",

},
{
  title: "Staff of Worship",
},
{
  title: "Staff of Alberto",
}
]



</script>
<template lang="pug"> 
div(grid="~ cols-3 gap-6" flex-grow)
  VList(v-for="item in titlar" :key="item.title" h="full")
    Card(rounded="tl tr")
      h1(text="5xl") IMAGE
    Card(bg="black" rounded="bl br" flex-grow) 
      VList(flex-grow)
        TitleDetail(mb="auto")
          template(#default) {{ item.title }}
        HList()
          TitleDetail()
            template(#detail) 
              div(grid="~ cols-3")
                div() {{ $t(`landmarks.sharesLabel`) }}
                div() {{ $t(`landmarks.ownersLabel`) }}
                div() {{ $t(`landmarks.earningDiameterLabel`) }}
            TitleDetail()
              template(#default) 
                div(grid="~ cols-3")
                  div() [API]
                  div() [API]
                  div() [API]
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('claim')" :text="$t('landmarks.claimButton')")
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
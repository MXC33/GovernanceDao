<template lang="pug">
VList(w="fit")
  Card(rounded="tl tr")
    h1(text="5xl") IMAGE
  Card(bg="black" rounded="bl br")
    VList()
      TitleDetail()
        template(#default) monumentals
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
    button(btn="~ primary-outline") view
  
  
</template>
  
<script lang="ts" setup>



</script>
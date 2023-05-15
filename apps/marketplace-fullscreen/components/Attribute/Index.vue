<template lang="pug">
HList(px="6" py="7" space-x="2")
  AttributeItem(v-for="data in testData")
    template(#header) {{ data.header }}
    template(#icon v-if="data.isToken")
      IXT(w="6" h="6")
    template(#default) {{ data.value }}
</template>

<script lang="ts" setup>
import IXT from '~/assets/icons/token/ixt.svg'

const testData = [
{
  header: 'total volume',
  value: '23,456',
  isToken: true
},
{
  header: 'floor price',
  value: '42',
  isToken: true
},
{
  header: 'best offer',
  value: '720',
  isToken: true
},
{
  header: 'listed',
  value: '11%',
  isToken: false
},
{
  header: 'owners',
  value: '15k',
  isToken: false
},
{
  header: 'unique owners',
  value: '24%',
  isToken: false
}
]

</script>
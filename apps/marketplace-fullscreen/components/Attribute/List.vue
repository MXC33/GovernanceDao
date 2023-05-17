<template lang="pug">
HList(py="0 md:7" space-x="md:2" flex-wrap="none lt-md:~")
  AttributeItem(v-for="data in testData")
    template(#header) {{ data.header }}
    template(#icon v-if="data.isToken")
      IXT(w="3 md:6" h="3 md:6")
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
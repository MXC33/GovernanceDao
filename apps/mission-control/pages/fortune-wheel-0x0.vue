<template lang="pug">
div(flex="~ col grow" min-h="0" pos="relative" p="3")
  div(max-w="300" w="full" space-y="4" mx="auto" )
    div(bg="white" p="4" rounded="lg" shadow="lg" flex="~ col"  w="full" max-h="full" overflow-y="auto" scrollbar="~ mc")
      textarea(v-model="inputData" b="1" rounded="lg" p="2" h="48" resize="none" placeholder="Enter your weighted list, eg:\n0x12345,100\n0x3434903,30")

    div(bg="white" p="4" rounded="lg" shadow="lg" flex="~ col"  w="full" max-h="full" overflow-y="auto" scrollbar="~ mc")
      div(bg="white" v-if="pickedAdresses.length > 0" space-y="3" p="3") 
        div(text="xl") PICKED RANDOM WINNER
        div(v-for="(address, index) in pickedAdresses" :key="address") 
          div(bg="orange-100" b="1 orange-400" color="orange-800" p="6" text="xl" rounded="xl") 
            span(font="bold") {{index + 1}}. 
            span {{ address }}

      button(btn="~ secondary" bg="black" @click="generateFortune" v-if="inputData != ''") Pick a winner
      div(v-else) No data yet
</template>


<script lang="ts" setup>
const inputData = ref("")
const pickedAdresses = ref<string[]>([])


//pick random index from input data
const pickRandom = (arr: string[]) => {
  const dice = Math.random()
  // console.log("Dice roll: ", dice)
  const index = Math.floor(dice * arr.length)
  return arr[index]
}

interface WalletFortune {
  address: string
  weight: number
}

//split input data into lines and split on commas
const generateFortune = () => {
  const lines = inputData.value.split("\n")
  const fortunes = generateWeightedAdresses(lines)
  const randomPick = pickRandom(fortunes)
  if (randomPick)
    pickedAdresses.value.push(randomPick)
}

const generateWeightedAdresses = (lines: string[]) => {
  return lines.map(line => {
    const [adress, weight] = line.split(",")
    if (pickedAdresses.value.includes(adress))
      return []
    return new Array(Number(weight)).fill(adress)
  }).flat()
}

//add auth middleware to page
definePageMeta({
  middleware: 'auth'
})
</script>
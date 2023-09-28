<template lang="pug">
div(flex="1"  pos="relative" @click="skipWriting")
  p(pos="absolute" inset="0")
    span {{ outputLines }}
    span.cursor(v-if="isConsoleRunning")  _

  p(opacity="0") {{ lines }}
</template>

<script lang="ts" setup>
const { outputLines, isConsoleRunning, startWriting, skipWriting, setText } = useWriter()

const props = defineProps<{
  lines: string
}>()

setText(props.lines)

watch(() => props.lines, () => {
  skipWriting()
  write()
})

const write = () => {
  startWriting()
}

onUnmounted(() => skipWriting())

onMounted(() => write())
</script>

<style>
.input {
  background: transparent;
  border: none;
  color: #fff;
  caret-color: transparent;
}

.input br {
  display: none;
}

.input:focus {
  outline: none;
  border: none;
}

.cursor {
  animation: blinking 800ms infinite;
  margin-left: -5px;
}

@keyframes blinking {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>


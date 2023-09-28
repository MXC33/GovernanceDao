const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useWriter = () => {
  const inputText = ref<string>("")
  const displayed = ref(false)

  const speed = ref(0.5)
  const isConsoleRunning = ref(false)
  const outputLines = ref<string>()
  const cancel = ref(false)

  const setText = (text: string, start: boolean = false) => {
    displayed.value = false
    inputText.value = text
    if (start)
      startWriting()
  }

  const skipWriting = () => {
    cancel.value = true
    outputLines.value = inputText.value
  }

  const startWriting = async () => {
    if (isConsoleRunning.value || displayed.value) {
      return
    }

    outputLines.value = ""
    isConsoleRunning.value = true

    await writeRow(inputText.value)

    isConsoleRunning.value = false
    displayed.value = true
    cancel.value = false
  }

  const writeRow = async (text: string) => {
    //const rowIndex = outputLines.value.length - 1
    let charIndex = 0;

    const appendCharacter = async (): Promise<Boolean> => {
      if (charIndex >= text.length || cancel.value) {
        return true
      }

      outputLines.value += text[charIndex]
      charIndex++;

      await timeout(Math.floor((Math.random() * 50 * speed.value) + 0.1))

      return appendCharacter()
    }

    await appendCharacter()
  }

  return {
    startWriting,
    skipWriting,
    setText,
    isConsoleRunning,
    outputLines,
  }
}

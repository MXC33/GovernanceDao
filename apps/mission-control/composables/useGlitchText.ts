const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useGlitchText = () => {
  const rows = ref<string[]>([])
  const outputLines = ref<string[]>([])
  const displayed = ref(false)

  const speed = ref(0.1)
  const isRunning = ref(false)

  watch(rows, () => {
    displayed.value = false
  })

  const setText = (newRows: string[]) => {
    rows.value = newRows
  }


  const startWriting = () => {
    if (isRunning.value || displayed.value)
      return

    outputLines.value = []
    isRunning.value = true

    for (const text of rows.value) {
      write(text)
    }

  }

  const write = async (text: string) => {
    let row = [...text]

    const rowIndex = outputLines.value.length - 1
    let index = 0

    const appendCharacter = async () => {
      const currentCharacter = text[index]
      if (outputLines.value[rowIndex][index] == currentCharacter) {
        return true
      }

      const glitchIndex = (3 + Math.round(Math.random() * 5)) * (Math.round(Math.random()) - .5) * 2;

      const unicode = Math.min(Math.max(currentCharacter.charCodeAt(0) + glitchIndex, 10), 30);
      const isSpace = currentCharacter == " "

      row[index] = isSpace ? " " : String.fromCharCode(unicode)
      index += 1

      await timeout(Math.floor((Math.random() * 10 * speed.value)))

      return appendCharacter()
    }

    await appendCharacter()
    return true
  }

  return {
    startWriting,
    isRunning,
    setText,
    outputLines
  }
}

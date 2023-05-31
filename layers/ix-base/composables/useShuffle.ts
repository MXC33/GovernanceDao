import { start } from "repl"

export const useShuffle = () => {
  const glitchedText = ref("")
  const textToGlitch = ref("")
  const isGlitchRunning = ref(false)
  const hasRunOnce = ref(false)

  watch(textToGlitch, (newText) => {
    glitchedText.value = newText
    stopGlitch()
    startGlitch()
  })

  // set values
  let textKeys: number[] = [];
  let frame = 0;
  let position = 0;
  let currentText = "";
  let keepRunning = true;
  let animateId: (NodeJS.Timer | null) = null

  const finishedRun = () => {
    isGlitchRunning.value = false
    hasRunOnce.value = true
  }

  const stopGlitch = () => {
    // set interval
    if (animateId)
      clearTimeout(animateId);

    frame = 0;
    position = 0;
    currentText = '';
    keepRunning = false
    isGlitchRunning.value = false
  }


  const startGlitch = () => {
    // reset values
    stopGlitch()

    play()
  }

  // merge options
  const options = Object.assign({}, {
    text: '', //finally displayed text
    waitChar: '_', // text displayed before change
    charSpeed: 3, // number of characters to change at once
    moveFix: 2, // Fixed delay time for text change
    moveRange: 3, // Random delay time range
    moveTrigger: 4, // Time related when the character is changing randomly
    callback: null, // Function to be executed after animation
  }, {});


  /**
   * stack
   */
  function stack() {
    let str = currentText;
    let finishedWord = true

    for (let tick = position; tick <= frame; tick++) {
      if (0 !== textKeys[tick] && null != textKeys[tick]) {
        const selectKey = textKeys[tick];
        finishedWord = false
        if (Math.abs(selectKey) <= options.moveTrigger) {
          const unicode = Math.min(Math.max(textToGlitch.value.charCodeAt(tick) + selectKey, 33), 126);
          str += String.fromCharCode(unicode);
        } else {
          str += options.waitChar;
        }
        selectKey > 0 ? textKeys[tick] -= 1 : textKeys[tick] += 1;
      } else {
        if (position === tick - 1) {
          position = tick;
          currentText = textToGlitch.value.substring(0, position);
        }
        str += textToGlitch.value.charAt(tick);
      }
      glitchedText.value = str;
    }

    if (frame <= textToGlitch.value.length)
      frame += options.charSpeed

    if (!finishedWord && keepRunning)
      animateId = setTimeout(stack, 1500 / 60);
    else
      finishedRun()
  }

  // play
  const play = () => {
    if (isGlitchRunning.value)
      return
    isGlitchRunning.value = true
    keepRunning = true
    glitchedText.value = options.waitChar;

    // set values
    for (let i = 0; i <= textToGlitch.value.length - 1; i++) {
      if (' ' !== textToGlitch.value.charAt(0)) {
        textKeys[i] = (options.moveFix + Math.round(Math.random() * options.moveRange)) * (Math.round(Math.random()) - .5) * 2;
      }
      else {
        textKeys[i] = 0;
      }
    }
    requestAnimationFrame(stack)
  }


  return {
    startGlitch,
    stopGlitch,
    textToGlitch,
    glitchedText,
    hasRunOnce,
    isGlitchRunning
  }
}

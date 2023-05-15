
import { MaybeRef, get } from '@vueuse/core'

import hover1 from "~/assets/sounds/hover-1.wav"
import hover2 from "~/assets/sounds/hover-2.wav"
import click1 from "~/assets/sounds/click-primary-1.wav"
import click2 from "~/assets/sounds/click-primary-2.wav"
import click3 from "~/assets/sounds/click-primary-3.wav"
import clickClose1 from "~/assets/sounds/click-back-1.wav"

interface Module {
  default?: string
}
export const useSoundSettings = () => {
  const isSoundEnabled = useCookieState('sound-on', () => true)
  const soundVolume = computed(() => isSoundEnabled.value ? 0.25 : 0)

  return {
    isSoundEnabled,
    soundVolume
  }
}

export type SoundSize = 'sm' | 'md' | 'lg' | 'sm-x' | 'md-x' | 'none'
interface Options {
  volume?: MaybeRef<number>
}


const useSound = (file: Module, options: Options = {}) => {
  const path = String(file)

  const urlParts = path?.split("/") ?? []

  console.log("url", path, urlParts)

  const fileName = urlParts[Math.max(0, urlParts.length - 1)]
  const id = `use-sound-${fileName.split(".")[0]}`
  const soundModule = useState<HTMLAudioElement | null>(id, () => null)


  const {
    volume = ref(1)
  } = options

  const setupAudioModule = () => {
    if (soundModule.value)
      return

    const audio = new Audio(path)
    soundModule.value = audio

    watch([() => get(volume), soundModule], ([newVolume, audioEngine]) => {
      if (!soundModule.value)
        return

      soundModule.value.volume = 1
    }, { immediate: true })
  }

  if (process.client)
    setupAudioModule()

  const play = () => {
    console.log("Play", soundModule.value)
    soundModule.value?.play.bind(soundModule.value)
  }

  return {
    play
  }
}

export const usePlaySound = () => {
  const { soundVolume } = useSoundSettings()
  const { play: playHoverSmall } = useSound(hover1, { volume: soundVolume })
  const { play: playHoverLarge } = useSound(hover2, { volume: soundVolume })
  const { play: playClickSmall } = useSound(click1, { volume: soundVolume })
  const { play: playClickMedium } = useSound(click2, { volume: soundVolume })
  const { play: playClickLarge } = useSound(click3, { volume: soundVolume })
  const { play: playClickBack } = useSound(clickClose1, { volume: soundVolume })

  const playClick = (size: SoundSize) => {
    switch (size) {
      case 'sm':
        return playClickSmall()
      case 'md':
        return playClickMedium()
      case 'lg':
        return playClickLarge()
      case 'sm-x':
        return playClickBack()
      case 'md-x':
        return playClickBack()
    }
  }

  const playHover = (size: SoundSize) => {
    switch (size) {
      case 'sm':
      case 'sm-x':
        return playHoverSmall()
      case 'md':
      case 'md-x':
      case 'lg':
        return playHoverLarge()
    }
  }

  return { playClick, playHover }
}
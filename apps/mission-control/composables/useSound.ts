
// import { useSound } from '@vueuse/sound'
// import hover1 from '/sounds/hover-1.wav'
// import hover2 from '/sounds/hover-2.wav'
// import click1 from '/sounds/click-primary-1.wav'
// import click2 from '/sounds/click-primary-2.wav'
// import click3 from '/sounds/click-primary-3.wav'
// import clickClose1 from '/sounds/click-back-1.wav'

export const useSoundSettings = () => {
  const isSoundEnabled = useCookieState('sound-on', () => true, { consentLevel: 'preferences' })
  const soundVolume = computed(() => isSoundEnabled.value ? 0.25 : 0)

  return {
    isSoundEnabled,
    soundVolume
  }
}

export type SoundSize = 'sm' | 'md' | 'lg' | 'sm-x' | 'md-x' | 'none'

export const usePlaySound = () => {

  const { soundVolume } = useSoundSettings()
  // const { play: playHoverSmall } = useSound(hover1, { volume: soundVolume })
  // const { play: playHoverLarge } = useSound(hover2, { volume: soundVolume })
  // const { play: playClickSmall } = useSound(click1, { volume: soundVolume })
  // const { play: playClickMedium } = useSound(click2, { volume: soundVolume })
  // const { play: playClickLarge } = useSound(click3, { volume: soundVolume })
  // const { play: playClickBack } = useSound(clickClose1, { volume: soundVolume })

  const playClick = (size: SoundSize) => {
    // switch (size) {
    //   case 'sm':
    //     return playClickSmall()
    //   case 'md':
    //     return playClickMedium()
    //   case 'lg':
    //     return playClickLarge()
    //   case 'sm-x':
    //     return playClickBack()
    //   case 'md-x':
    //     return playClickBack()
    // }
  }

  const playHover = (size: SoundSize) => {
    // switch (size) {
    //   case 'sm':
    //   case 'sm-x':
    //     return playHoverSmall()
    //   case 'md':
    //   case 'md-x':
    //   case 'lg':
    //     return playHoverLarge()
    // }
  }

  return { playClick, playHover }
}
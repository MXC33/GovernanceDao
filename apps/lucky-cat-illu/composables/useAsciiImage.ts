import { ref } from 'vue'

export const useAsciiImageSettings = () => {

  const columns = computed(() => 120)
  const offset = useState('ascii-offset', () => 0.26)
  const resolutionY = useState('ascii-resolution-y', () => 0.7)
  const contrast = useState('ascii-contrast', () => 1.9)
  const brightness = useState('ascii-brightness', () => 0.5)

  const map = useState('ascii-map', () => "$80ft1i;:,. ")
  // const map = useState('ascii-map', () => "$%#zzzx*•+=-:.  ") 
  // const map = useState('ascii-map', () => "$f; :,.   ") 


  return {
    columns,
    offset,
    brightness,
    resolutionY,
    contrast,
    map
  }

}

export const useLFO = (speed: number = 0.001, useRandom: boolean = true) => {
  const isRunning = ref(false)
  const startRandom = Math.random()
  const rand = ref(0)
  const sine = ref(0)
  const linear = ref(0)
  const seed = ref(0)
  const lfoSpeed = ref(speed + Math.random() * 0.0005)

  const rand32 = (a: number) => {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }

  const stepFrame = () => {
    if (!isRunning.value)
      return

    const stepTime = Math.floor(linear.value * 10) / 10
    rand.value = rand32(stepTime * 1000 * startRandom)

    linear.value = (linear.value + lfoSpeed.value) % 1
    sine.value = Math.sin(linear.value * (Math.PI))


    setTimeout(() => requestAnimationFrame(stepFrame), 1000 / 60);
  }

  stepFrame()

  const start = () => {
    if (isRunning.value)
      return

    isRunning.value = true

    setTimeout(stepFrame, Math.random() * 200)
  }

  const stop = () => {
    isRunning.value = false
  }

  return {
    start,
    stop,
    lfoSpeed,
    isRunning,
    linear,
    sine,
    rand
  }
}

const midPoint = (x: number) => (Math.max(0, x > 1.0 ? 1.0 + (1.0 - x) : x))
const ease = (x: number) => {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}


export const useAsciiImage = () => {
  const { columns, resolutionY, contrast, brightness, map } = useAsciiImageSettings()

  const url = ref<string | null>(null)
  const imageLoaded = ref(false)
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image()
  const asciiArt = ref<string[]>()
  const brighten = ref(0.4)
  const ratio = ref(1)
  const imageWidth = ref(0)
  const imageHeight = ref(0)

  image.setAttribute('crossOrigin', 'anonymous');

  watch(url, (newURL) => {
    if (!newURL)
      return

    imageLoaded.value = false
    image.src = newURL
    image.decode().then((imageData) => {
      imageLoaded.value = true
      console.log("Loaded data")
    })
  }, { immediate: true })

  const imageData = ref<Uint8ClampedArray>()

  const columnSize = computed(() => Math.max(4, columns.value))

  watch([imageLoaded, columns, resolutionY], () => {
    if (!imageLoaded.value)
      return

    ratio.value = image.width / image.height;
    if (!ctx)
      return

    // Scale the image to the desired dimensions.
    canvas.width = columnSize.value;
    canvas.height = columnSize.value / ratio.value * resolutionY.value;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const contextImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    if (contextImageData)
      imageData.value = contextImageData.data;
  })

  watch([map, brighten, brightness, imageData, contrast], () => {
    const brightLevel = ((brightness.value * 2.0) - 1.5) + brighten.value
    if (imageData.value)
      asciiArt.value = generateAsciiData(imageData.value, columnSize.value, map.value, brightLevel, contrast.value)
  })

  return {
    asciiArt,
    imageWidth,
    imageHeight,
    brighten,
    ratio,
    url,
    map
  }
}

const generateAsciiData = (data: Uint8ClampedArray, columns: number, map: string, brighten: number, contrast: number) => {
  let asciiChars: string[] = [];
  const invert = true

  // Calculate the average brightness for a tile
  for (let i = 0; i < data.length; i += 4) {
    data[i] = (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]);
  }

  // Map the tile's brightness to an ASCII character
  for (let i = 0; i < data.length; i += 4) {
    let pixel = ((data[i] / 255) + (-0.5 + brighten * 0.5)) * contrast;
    pixel = clamp(invert ? 1.0 - pixel : pixel)

    const rchar = map[Math.round((map.length - 1) * pixel)];

    asciiChars.push(rchar);

    if (Math.ceil((i + 1) / 4) % columns == 0)
      asciiChars.push("\n");
  }

  return asciiChars
}

const clamp = (x: number): number => Math.max(0, Math.min(1, x))
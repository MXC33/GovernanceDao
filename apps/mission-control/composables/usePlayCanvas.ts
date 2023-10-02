import { Application } from "playcanvas";
import * as pc from 'playcanvas';


export const usePlayCanvas = () => {
  const { onClickTile } = useBuildTools()
  const { amountOfStakeRings } = useTileRings()
  const { addCacheKey } = useCacheKey()
  const { gameInterface, setRings } = useGameInterface()

  const config = useRuntimeConfig().public
  // UPDATE THESE ON NEW BUILDS
  const ROOT_URL = config.s3 + "/HexMiniverse/"
  const SCENE_PATH = addCacheKey(ROOT_URL + "1422614.json");
  const SCRIPTS = [80861757, 104446193, 82078076, 80861745, 80861746, 80861747, 80861749, 80861758, 81245240, 81245421, 86747700, 86747705, 81245425, 81261447, 81270380, 81271463, 81361539, 81593496, 81960500, 82109471, 82329071, 82525447, 82538111, 83239202, 85604743, 88961004, 89169266, 89977233, 90007976, 90935075, 92927892, 105051376, 105222595, 105374586, 105395187, 107642136, 107675399, 107902145, 108260001, 109640940, 109705772, 109924041, 110145065, 115838775, 115986319, 117877245, 118218742, 118227650, 121499248, 122770621, 122782962, 122804507, 122804511, 123013692, 123033452, 123262360, 123489661, 123605158, 123489663, 123662206, 123501550, 125466356, 125680166, 125837910, 125951272, 126216857, 126372444, 127016767, 127018841, 127104543, 127575435, 130004984, 130021782, 130158862, 130825201, 131204661, 141604360];


  const CONTEXT_OPTIONS = {
    'antialias': true,
    'alpha': false,
    'preserveDrawingBuffer': false,
    'preferWebGl2': true,
    'powerPreference': "default"
  };


  const ASSET_PREFIX = ROOT_URL;
  const SCRIPT_PREFIX = ROOT_URL;

  const CONFIG_FILENAME = addCacheKey(ROOT_URL + 'config.json');
  const INPUT_SETTINGS = {
    useKeyboard: true,
    useMouse: true,
    useGamepads: false,
    useTouch: true
  };


  const playcanvasApp = useState<Application | null>('playcanvas-app', () => null)
  const canvas = useState<HTMLCanvasElement | null>('playcanvas-canvas', () => null)

  const createInputDevices = (canvas: HTMLCanvasElement) => ({
    elementInput: new pc.ElementInput(canvas, {
      useMouse: INPUT_SETTINGS.useMouse,
      useTouch: INPUT_SETTINGS.useTouch
    }),
    keyboard: INPUT_SETTINGS.useKeyboard ? new pc.Keyboard(window) : null,
    mouse: INPUT_SETTINGS.useMouse ? new pc.Mouse(canvas) : null,
    gamepads: null,
    touch: INPUT_SETTINGS.useTouch && pc.platform.touch ? new pc.TouchDevice(canvas) : null
  })

  const setMouseEnabled = (enabled: boolean) => {
    if (!playcanvasApp.value)
      return

    const { setMouseInCanvas } = useGameInterface()
    setMouseInCanvas(enabled)

    if (enabled)
      playcanvasApp.value.mouse.attach(canvas.value)
    else
      playcanvasApp.value.mouse.detach()

  }

  const remove = () => {
    playcanvasApp.value.scripts.list().forEach((script) => {
      playcanvasApp.value.scripts.remove(script)
    })
    // playcanvasApp.value.destroy();
    pc.app.destroy();
    playcanvasApp.value = null
    gameInterface.value = null
  }

  const attachToCanvas = (domCanvas: HTMLCanvasElement, cb: () => void) => {
    if (playcanvasApp.value != null) {
      pc.app.destroy();
    }

    const inputs = createInputDevices(domCanvas);
    canvas.value = domCanvas

    const app = new pc.Application(domCanvas, {
      elementInput: inputs.elementInput,
      keyboard: inputs.keyboard,
      mouse: inputs.mouse,
      gamepads: inputs.gamepads,
      touch: inputs.touch,
      graphicsDeviceOptions: CONTEXT_OPTIONS,
      assetPrefix: ASSET_PREFIX,
      scriptPrefix: SCRIPT_PREFIX,
      scriptsOrder: SCRIPTS.map(scr => String(scr)),
    })
    playcanvasApp.value = app

    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    app.configure(CONFIG_FILENAME, (err) => {
      if (err) return console.error(err);

      app.preload(() => {
        app.scenes.loadScene(SCENE_PATH, (err, scene) => {
          if (err) return console.error(err)
          startApp(app)
          cb()
        })
      })
    })
  }

  const startApp = (app: Application) => {
    //disable bloom
    // app.root.findByName("CameraEntity").script.bloom.enabled = false;

    //Disable the ingame GUI
    var gameTempGuiEntity = app.root.findByName("PlaceholderGUI");
    gameTempGuiEntity.enabled = false;
    //Disable the ingame backendinterface
    var gameTempBackendInterface = app.root.findByName("BackendInterface");
    gameTempBackendInterface.enabled = false;

    var fpsCounter = app.root.findByName("CameraRoot");

    var useScaledResolution = app.root.findByName("UseScaledResolution");
    //@ts-ignore
    useScaledResolution.script.resolutionScaling.scale = 0.75;
    //@ts-ignore
    fpsCounter.script.fps.enabled = false;
    app.start()

    // useScaledResolution.enabled = false;

    //Get the gameInterface script
    var gameInterfaceEntity = app.root.findByName("GameInterface");

    // @ts-ignore
    var gameInterfaceScript = gameInterfaceEntity.script.gameInterface;

    //Print game interface functions to console
    // console.log(gameInterfaceScript.__scriptType.prototype);

    app.on('tile:clicked', onClickTile);

    //Expose app and gameInterface to NUXT

    gameInterface.value = markRaw(gameInterfaceScript)

    setRings(amountOfStakeRings.value)
  }

  return {
    playcanvasApp,
    remove,
    attachToCanvas,
    setMouseEnabled
  }
}

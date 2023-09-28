export const useAppSetup = () => {
  const setupPaintWorker = () => {
    //@ts-ignore
    const isPaintSupported = !!CSS.paintWorklet

    if (isPaintSupported) {
      //@ts-ignore
      CSS.paintWorklet.addModule('/paint/border.js');
    }

    document.body.classList.toggle('is-paint-supported', isPaintSupported)
    document.body.classList.toggle('is-not-paint-supported', !isPaintSupported)
  }

  return {
    setupPaintWorker
  }
}
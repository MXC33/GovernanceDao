type videoType = 'webm'

export const useDetectWebm = (type: videoType = 'webm') => {
  let video;

  let formats = {
    webm: 'video/webm; codecs="vp8, vorbis"'
  };

  if(!video) {
    video = document.createElement('video')
  }
  const isSupportWebm = computed(() => video.canPlayType(formats[type] || type))
  
  return isSupportWebm
}
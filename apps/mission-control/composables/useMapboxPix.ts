export interface MapboxPixProperties {
  category_id: number,
  country_code: string,
  merkle_index: number,
  pix_id: string,
  player_id: number,
  unit_id: number,
  _id: string,
  _index: string
}

export interface MapboxPix {
  id: string,
  properties: MapboxPixProperties
  tile?: { z: number, x: number, y: number },
}

export const useMapboxPix = () => {
  const list = useState<MapboxPix[]>('mapbox-visible-pix', () => [])
  const slicedList = computed(() => list.value.slice(0, 7))

  return {
    list,
    slicedList
  }
}


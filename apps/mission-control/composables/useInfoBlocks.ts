import { NftFragment } from "#gql"

const InfoBlockTypes = ['description', 'table', 'details', 'attributes', 'header', 'image', 'sectionHeader', 'sheet', 'tabs', 'slideshow', 'slideshowHeader'] as const

export type InfoBlockType = typeof InfoBlockTypes[number]

export type InfoBlock = InfoBlockImage | InfoBlockHeader | InfoBlockDescription | InfoBlockAttributes | InfoBlockTable | InfoBlockDetails | InfoBlockSectionHeader | InfoBlockSheet | InfoBlockTabs | InfoBlockSlideshowHeader | InfoBlockSlideshow

export interface TokenWithInfoBlocks {
  token: NftFragment,
  infoBlocks?: InfoBlock[]
}

export interface InfoBlockBase {
  blockType: InfoBlockType
}

export interface InfoBlockSectionHeader extends InfoBlockBase {
  blockType: 'sectionHeader'
  title: string
}

export interface InfoBlockHeader extends InfoBlockBase {
  blockType: 'header'
  title?: string,
  items: InfoBlockItem[]
  content?: InfoBlock[]
}

export interface InfoBlockButton {
  text?: string,
  onClick: () => void,
  hidden?: boolean
  disabled?: () => boolean
}

export interface InfoBlockSlideshowHeader extends InfoBlockBase {
  blockType: 'slideshowHeader'
  title?: string,
  items: InfoBlockItem[]
  content?: InfoBlock[]
  slideShowItems: NftFragment[]
  button?: InfoBlockButton
}

export interface InfoBlockSlideshow extends InfoBlockBase {
  blockType: 'slideshow'
  items: NftFragment[]
  forceImage?: boolean
}

export interface InfoBlockTabGroup {
  tab: string,
  content: InfoBlock[]
}

export interface InfoBlockTabs extends InfoBlockBase {
  blockType: 'tabs'
  groups: InfoBlockTabGroup[]
}


export interface InfoBlockImage extends InfoBlockBase {
  blockType: 'image',
  imageToken?: NftFragment,
  imageAsset?: string
}

export interface InfoBlockDescription extends InfoBlockBase {
  blockType: 'description'
  title: string,
  body?: string
  metaInfo?: InfoBlockTable
}

export type InfoBlockItemDynamicValue = 'tokenBalance' | 'timeLeft' | 'text'

export type InfoBlockItemState = 'active' | 'disabled' | 'accent' | 'success' | 'error'

interface InfoBlockValueState {
  state?: InfoBlockItemState
}

export interface InfoBlockValue extends InfoBlockValueState {
  value: string
}

export interface InfoBlockItemBase extends InfoBlockValueState {
  name: string
  oneColumn?: true,
  withButton?: true,
  valueState?: InfoBlockItemState
  valueType?: InfoBlockItemDynamicValue
}

export interface InfoBlockItemText extends InfoBlockItemBase {
  valueType?: 'text',
  value: string,
  noAnimation?: boolean
}

export interface InfoBlockItemTimeLeft extends InfoBlockItemBase {
  valueType: 'timeLeft'
  endTime: number
}

export interface InfoBlockItemBalance extends InfoBlockItemBase {
  valueType: 'tokenBalance'
}

export type InfoBlockItem = InfoBlockItemText | InfoBlockItemTimeLeft | InfoBlockItemBalance

export interface InfoBlockTable extends InfoBlockBase {
  blockType: 'table',
  oneColumn?: true,
  items: InfoBlockItem[]
}

export interface InfoBlockSheetRow {
  columns: InfoBlockValue[]
}

export interface InfoBlockSheet extends InfoBlockBase {
  blockType: 'sheet',
  title?: string,
  secondaryTitle: string,
  header: InfoBlockSheetRow
  rows: InfoBlockSheetRow[]
}

export interface InfoBlockDetailSection {
  title?: string,
  items: InfoBlockItem[]
}

export interface InfoBlockDetails extends InfoBlockBase {
  blockType: 'details'
  title: string,
  image?: string,
  sections: InfoBlockDetailSection[]
}

export interface InfoBlockAttributes extends InfoBlockBase {
  blockType: 'attributes',
  title: string,
  items?: InfoBlockItem[],
  tokenAttributes?: boolean,
  token?: NftFragment
}

export const useInfoBlocks = () => { }


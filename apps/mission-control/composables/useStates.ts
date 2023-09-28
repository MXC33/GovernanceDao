import { GameMenuId } from '~~/composables/types'
export const useSiteMenuOpen = () => useState('site-menu-open', () => false)

export const useGameMenu = () => useState<GameMenuId | null>('activeTab', () => null)

export const useSiteSettings = () => useState('site-setting', () => false)

export const useSwapIXT = () => useState('show-swap', () => false)
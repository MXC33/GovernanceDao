type Popup = 'confirm-pix' | 'transaction' | 'collectWaste' | 'treasure-chest' | 'cosmetics' | 'connect' | 'company-global-waste' | 'company-newlands' | 'company-eternalab' | 'inventory' | 'bio' | 'select-pix' | 'company-lucky-cat' | 'starter-pack' | 'payments' | 'popup-ad' | 'company-haveblue' | 'company-arcade'
export const usePopups = () => useState<Popup | null>('active-popup', () => null)

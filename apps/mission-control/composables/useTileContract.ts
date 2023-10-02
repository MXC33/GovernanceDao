
import { NftFragment } from '#gql';
import { Corporation } from './corporations/useCorporations';
import type { TileRing } from './useTiles';

export interface Cost {
  price: number,
  token?: NftFragment
}

export interface TileContract {
  ring: TileRing,
  tokenId: number,
  contractor: Corporation,
  costPerTile: Cost,
  payInterval?: 'monthly'
}

export const useTileContract = () => {

  const selectedContract = useState<TileContract | null>('build-contract-selection', () => null)


  const availableContracts: TileContract[] = [
    {
      ring: 'A',
      tokenId: 35,
      contractor: 'new-lands',
      costPerTile: {
        price: 0
      }
    },
    {
      ring: 'B',
      tokenId: 36,
      contractor: 'new-lands',
      payInterval: 'monthly',
      costPerTile: {
        price: 1,
        token: { tokenInfo: { type: 'astro-gold' } }
      }
    },
    {
      ring: 'C1',
      tokenId: 37,
      contractor: 'new-lands',
      payInterval: 'monthly',
      costPerTile: {
        price: 1,
        token: { tokenInfo: { type: 'astro-gold' } }
      }
    },
    {
      ring: 'C2',
      tokenId: 38,
      contractor: 'new-lands',
      payInterval: 'monthly',
      costPerTile: {
        price: 1,
        token: { tokenInfo: { type: 'astro-gold' } }
      }
    }
  ]

  return {
    availableContracts,
    selectedContract
  }
}
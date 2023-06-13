
export const useCollectionName = (collectionAddress?: string) => {
  if (!collectionAddress)
    return "My Assets"

  switch (collectionAddress.toLowerCase()) {
    case assetsAddress.polygon?.toLowerCase():
      return 'PlanetIX - Assets'
    case landmarkAddress.polygon?.toLowerCase():
      return 'Landmarks'
    case gravityGradeAddress.polygon?.toLowerCase():
      return 'Gravity Grade'
    case avatarNFTAddress.polygon?.toLowerCase():
      return 'Avatars'
    case badgeNFTAddress.polygon?.toLowerCase():
      return 'AOC Badges'
    case roverAddress.polygon?.toLowerCase():
      return 'Rovers'

  }
}
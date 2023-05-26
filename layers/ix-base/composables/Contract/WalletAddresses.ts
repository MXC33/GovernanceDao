import type { Chain } from "./useWallet"

type ContractAddress = Partial<Record<Chain, string>>

export const landmarkAddress: ContractAddress = {
  mumbai: "0xF3Ee20DEFd518F43696d16Cf4Cdc16B08c38e6F1",
  polygon: "0x24CfF55d808fD10A1E730B86037760E57eCAF549"
}

export const genesisNFTAddress: ContractAddress = {
  ethereum: "0xba6666B118f8303F990f3519DF07e160227cCE87",
  goerli: "0xfe12241Be4832A5f14B88398EF3FffBCCF6e9dE9"
}

export const stakedMissionControlNFTAddress: ContractAddress = {
  mumbai: "0xc9866595453069eC204cc1E6d38bcC6dd8DE5dC7",
  polygon: "0xc63352aCc1E22D74418f5c735adcf3aa23d0b078",
  ethereum: "0x6C84fE21309D94Cc8B7ccFe8F53A47A5b3111587",
  goerli: "0x541D4b7dbc7Db727c596c74748737Deb7001b9ef"
}

export const generic1155StoreAddress: ContractAddress = {
  mumbai: "0x0c32c2d96E3EBD470f4b78f095d9175c074f9DcD",
  polygon: "0x70012D84A1044454CfB2973d5968fA451F94f5CC"
}

export const missionControlStreamAddress: ContractAddress = {
  mumbai: "0xA71dcF8B49890F1D2C4809bed7a2Be44bA64A406",
  polygon: "0xb9D70840CcA6e6F71d3C884060EE123e13b4C27D"
}

export const superTokenAddress: ContractAddress = {
  mumbai: "0x3CAD7147c15C0864B8cF0EcCca43f98735e6e782",
  polygon: "0xFAc83774854237b6E31c4B051b91015e403956d3"
}

export const mintableSuperTokenAddress: ContractAddress = {
  mumbai: "0x1B4a41740B5eF7FBBD4b30793a80635709aa5d8D",
  polygon: "0x9308A7116106269eB11834dF494eFd00d244cF8e"
}

export const superFluidAddress: ContractAddress = {
  mumbai: "0xEB796bdb90fFA0f28255275e16936D25d3418603",
  polygon: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7"
}

export const contractFlowAgreementAddress: ContractAddress = {
  mumbai: "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
  polygon: "0x6EeE6060f715257b970700bc2656De21dEdF074C"
}


export const maxCoinAddress: ContractAddress = {
  mumbai: "0x86E6aeD8Fef97C57c183CE7f04C1649A0eE4db20",
  polygon: "0x86E6aeD8Fef97C57c183CE7f04C1649A0eE4db20" // does not exist
}

export const genericBurnGravityGradeAddress: ContractAddress = {
  mumbai: "0xF80be59beeD04BA31DD94f75aECb480540AbB129",
  polygon: "0x3C3dF115FA9336814854DA92572d4F5BA9865D2C"
}

export const genericBurnPixAssetsAddress: ContractAddress = {
  mumbai: "0x2319B0eDf72A935d349cE3002740918451ac12Ce",
  polygon: "0x6e4070c3da881d53Dee6841B9D4a97274B5B06aC"
}

export const USDTManagerAddress: ContractAddress = {
  mumbai: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", // does not exist
  polygon: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
}

export const USDCManagerAddress: ContractAddress = {
  mumbai: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // does not exist
  polygon: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
}

export const wrappedEthAddress: ContractAddress = {
  mumbai: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", // does not exist
  polygon: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
}

export const IXTAddress: ContractAddress = {
  mumbai: "0x12168dD03349fa6B3dae6ac8c552b6C86810Bf55", // emilCoin
  polygon: "0xE06Bd4F5aAc8D0aA337D13eC88dB6defC6eAEefE"
}

export const oracleManagerAddress: ContractAddress = {
  mumbai: "0xA1e722dA2F27201B7394A73a2D42ff5d43F9B14D", // does not exist
  polygon: "0xA1e722dA2F27201B7394A73a2D42ff5d43F9B14D"
}

export const gravityGradeAddress: ContractAddress = {
  mumbai: "0xF7b0892b05bd7Ae8d55c672f9c2406B651a98157",
  polygon: "0x3376C61c450359d402F07909Bda979a4c0e6c32F"
}

export const tetherAddress: ContractAddress = {
  mumbai: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // does not exist
  polygon: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
}

export const merkleMinterAddress: ContractAddress = {
  mumbai: "0xDcE37f71D193026a4E7b61fF14B34075858b6F84", // does not exist
  polygon: "0xDcE37f71D193026a4E7b61fF14B34075858b6F84"
}

export const globalWasteSystemAddress: ContractAddress = {
  mumbai: "0x9ca8855aC3D1970c1b934fFC63c230F37FAb2a9a",
  polygon: "0xbb5f9ADe0023aE87BDCD2268bDD74a2711654BDB"
}

export const eternaLabsOldAddress: ContractAddress = {
  mumbai: "0x6202595744051Ed42fD9A7a98b2729A961d2d4C8",
  polygon: "0x86214d04286C0d853670bEd2A6B1eD9bF14e39Bc"
}

export const eternaLabsAddress: ContractAddress = {
  mumbai: "0xC0b7EbC988e683be95B2543c9Bf50FE0547AEe96",
  polygon: "0xa47c861DE3272690a51F57e0E43551e55F6C790d"
}

export const newLandsAddress: ContractAddress = {
  mumbai: "0x2088075DB3Fe06db9e3283aaF792cd8A96511B83",
  polygon: "0x9C31aDa541dfa3E867460Be0572C1a57311Df6FF"
}

export const enterLuckyCatRaffleAddress: ContractAddress = {
  mumbai: "0x8555b3258989b3C8F28017939C10C63159E18C70",
  polygon: "0x1E68A27080f928D97D631337A6cD0690B42Fd482"
}

export const placeNFTAdress: ContractAddress = {
  mumbai: "0x0F4497805302E901fD9d4131eA70240474240a5d",
  polygon: "0x24E541A5C32830A4E8b89846fd4Bf86E294dd3cb"
}

export const oldPlaceNFTAdress: ContractAddress = {
  mumbai: "0x1eB138c81590683343C3f1c855858c684f15920a",
  polygon: "0x78f6ef4FA55e41b816cbc0f97a2D8743ba8795d9"
}

export const pixAdress: ContractAddress = {
  mumbai: "0x215e26B3D4fD1E73837254B809e2B6A2c6967781",
  polygon: "0xB2435253C71FcA27bE41206EB2793E44e1Df6b6D"
}

export const pixStakableAdress: ContractAddress = {
  mumbai: "0xa0C5A189733969d0F962Bc5284EeDb463BdA49C3",
  polygon: "0x56B4d5e18441fdd09bF4Ad69C484866E92B8650e"
}

export const assetStakableAdress: ContractAddress = {
  mumbai: "0xd226FB0E5a54a23e7c0333E001C0f0F19AB565F8",
  polygon: "0xDE953d986Df939E3ed802337Be363D91123ce699"
}

export const roverStakableAddress: ContractAddress = {
  mumbai: "0x754895592FdDba6A5f0947cc08b393DA34C6CCAF",
  polygon: "0x43f924C8D203AFE03D5c452eBb603b7E64BA4227"
}

export const roverAddress: ContractAddress = {
  mumbai: "0x5B183670817aC4b59eAa758eE08D2cd9e889D971",
  polygon: "0x836545dFc47F71ff33C458B98b283732A8ceE4F6"
}

export const avatarNFTAddress: ContractAddress = {
  mumbai: '0xd7cC40094b5045bb5547Cb1F84447DF1c8F9b6f5',
  polygon: '0xFba348af5f7F7DF1B2c8f114004303fdE02dF6Dc',
}

export const badgeNFTAddress: ContractAddress = {
  mumbai: '0x3E44C7D7322ccB9E03D1cF14c233faE5353458a7',
  polygon: '0x1D41E6723e7A5D7C889E4220E9b152D6cB84A157',
}

export const assetsAddress: ContractAddress = {
  mumbai: "0x1317aD91c39fDF49d07B3687c4D42c91E22dcCDc",
  polygon: "0xba6666B118f8303F990f3519DF07e160227cCE87"
}

export const lootChestAdress: ContractAddress = {
  mumbai: "0xb934246Ecd2589AD42eFDb29cC526327EcCF6c8a",
  polygon: "0x245755B57c16eC301e50D3B84fB12485f7E7860b"
}

export const burnGravityGradeAdress: ContractAddress = {
  mumbai: "0x38be64051025BE6916647e431A38d9dcc7168c30",
  polygon: "0xf4c89Cc6Cf4FA2097634ee0D17a26379375b16ED"
}

export const facilityUpgradeAdress: ContractAddress = {
  mumbai: "0x58D91c5e85B280Dabd4D8b9708Ed590937B3410E",
  polygon: "0x58D91c5e85B280Dabd4D8b9708Ed590937B3410E",
  // polygon needs update
}

export const conduitAdress: ContractAddress = {
  mumbai: "0x50964c7b9aD5eF312a756790b28a9FB48D6410c1", //to be updated
  polygon: "0x50964c7b9aD5eF312a756790b28a9FB48D6410c1",
}

export const conduitKey: ContractAddress = {
  mumbai: "0x37d1b52953d46066c2df29b920aa6c796d3ba2fe000000000000000000000000",
  polygon: "0x37d1b52953d46066c2df29b920aa6c796d3ba2fe000000000000000000000000"
}

export const feeTreasuryAdress: ContractAddress = {
  mumbai: "0x0D1c1D4Da1A42AE728F786ECf0a2aCCdE512cb4C", //to be updated
  polygon: "0x0D1c1D4Da1A42AE728F786ECf0a2aCCdE512cb4C",
}

export const seaportAdress: ContractAddress = {
  mumbai: "0x78852a22b6178406683afea36d1e4bdd2ff9c08d", //to be updated
  polygon: "0x78852a22b6178406683afea36d1e4bdd2ff9c08d",
}

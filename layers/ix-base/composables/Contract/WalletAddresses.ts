import type { Chain } from "./useWallet"

type ContractAddress = Partial<Record<Chain, string>>

export const catRaffStakingAddress: ContractAddress = {
  mumbai: 'does not exist',
  polygon: '0x773895915168137Be0C8dCbd6fd7E44e7cc9d3dB',
}

export const metashareStakingAddress: ContractAddress = {
  mumbai: 'does not exist',
  polygon: '0xbEafBE2eCC41152b8CeF4F155A260cA441F61829',
}

export const oneMonthIXTStakingAddress: ContractAddress = {
  mumbai: 'does not exist',
  polygon: '0x7D0495D8a918Fb9aA02feA8D23c970d5933bD793',
}

export const threeMonthIXTStakingAddress: ContractAddress = {
  mumbai: 'does not exist',
  polygon: '0x4f0eE43495f36e7665716B4d8d8701bC232E462b',
}

export const sixMonthIXTStakingAddress: ContractAddress = {
  mumbai: 'does not exist',
  polygon: '0xcB985163ca943FE6382a4165a762b38809Ea7Ff8',
}

export const twelveMonthIXTStakingAddress: ContractAddress = {
  mumbai: 'does not exist',
  polygon: '0x87277D6676cD567DFB5536E30146Cd54815f0C53',
}

export const territoryStakingAddress: ContractAddress = {
  mumbai: '0xd293F859140235834c68DB9c688959467126f126',
  polygon: '0x5cb9FcD65cfe3EEFDE88a7084caF2625d516BDD0',
}

export const landmarkStakedAddress: ContractAddress = {
  mumbai: "0x2E0cd48d90d7793b679A3925cB5727D07209f8ae",
  polygon: "0xB030dA155b6F3e67921157Ec7793EDF3e407a55B"
}

export const energyStakingAddress: ContractAddress = {
  mumbai: 'does not exist',
  polygon: '0x4f0eE43495f36e7665716B4d8d8701bC232E462b',
}

export const genericBurnGravityGradeV2Address: ContractAddress = {
  mumbai: "0x4d605e5b2D0F49d782568E26c6D170Ab34aC8958",
  polygon: "0xEAA88a8A4570D176D6e0E496fF0fcb3496Bf904B"
}
export const gravityGradeV2WrapperAddress: ContractAddress = {
  mumbai: "0xbeDA5D0B9b7CddE69D54493298698488C8752F98",
  polygon: "0x5A330dE8322aA11CF34e6E042e8eB617006397cf"
}
export const voucherAddress: ContractAddress = {
  mumbai: '0x9b11e38299f2e2094793640b67b5e29678792ab4',
  polygon: '0xBa60120b7C5c4159FF259D5f75Ae76a84B13256e',
}
export const assetsConverterAddress: ContractAddress = {
  mumbai: '0x7198952c218c1507aeD566307A45CE8539E82dA3',
  polygon: '0xfe37791340Ee7Ff305dB8DB2B4FFb861b9927b5A',
}
export const metaModFusionAddress: ContractAddress = {
  mumbai: '0xbDE445F7a7c08389cB3F1041788ccdD70F74e17F',
  polygon: '0xB714a0aa1211867cE2D3a41cd17b05046f76828A',
}

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
  mumbai: "0xbd54DcA0D7AFd2D076D1425b25049d4B6e2f48Ce",
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

export const geoLotteryRewardAddress: ContractAddress = {
  mumbai: "0x4a21Be7F3b7c845400ea2eE27A15b7C843d7f3e6",
  polygon: "0x30FFD41ed89cAC7ec314b65F0178Afb8A3651d44"
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

/*export const IXTAddress: ContractAddress = {
  mumbai: "0x12168dD03349fa6B3dae6ac8c552b6C86810Bf55", // emilCoin
  polygon: "0xE06Bd4F5aAc8D0aA337D13eC88dB6defC6eAEefE"
}*/
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
  polygon: "0x1f1045a8C9e957D698ED09786d21FC596a483105"
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
  polygon: "0x8623396298769Bf14EDAa709262c6733538aB298",
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

export const luckyCatGeoLotteryAdress: ContractAddress = {
  mumbai: "0xEFB617088a9A224D156AC0C8012CDDf360c3D42B",
  polygon: "0x530F526193B8a32B6AD31b3Cb5600927854C4E0f",
}

export const astroGoldAdress: ContractAddress = {
  mumbai: "0x3CAD7147c15C0864B8cF0EcCca43f98735e6e782",
  polygon: "0xfac83774854237b6e31c4b051b91015e403956d3"
}

export const luckyCatGeoLotterySuperAppAdress: ContractAddress = {
  mumbai: "0x6e488C8A7F7afcF4FfDbAd628d4ef9b312Bb11E1", //to be updated
  polygon: "0xb3574e674A7847AAFca45Efb49DB17Ab6d6C9834",
}

import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PIXTerritoryStaking,
  PIXTerritoryStakingMethodNames,
  PIXTerritoryStakingEventsContext,
  PIXTerritoryStakingEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type PIXTerritoryStakingEvents =
  | 'EpochAdded'
  | 'ModeratorUpdated'
  | 'OwnershipTransferred'
  | 'PIXStaked'
  | 'PIXUnstaked'
  | 'RewardAdded'
  | 'RewardClaimed'
  | 'RewardClaimedToken';
export interface PIXTerritoryStakingEventsContext {
  EpochAdded(...parameters: any): EventFilter;
  ModeratorUpdated(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PIXStaked(...parameters: any): EventFilter;
  PIXUnstaked(...parameters: any): EventFilter;
  RewardAdded(...parameters: any): EventFilter;
  RewardClaimed(...parameters: any): EventFilter;
  RewardClaimedToken(...parameters: any): EventFilter;
}
export type PIXTerritoryStakingMethodNames =
  | 'DURATION'
  | 'addEpochRewards'
  | 'claimAll'
  | 'claimBatch'
  | 'currentEpoch'
  | 'currentEpochEndTimestamp'
  | 'earnedBatch'
  | 'earnedBatchUntilTimestamp'
  | 'earnedByAccount'
  | 'earnedByAccountUntilTimestamp'
  | 'earnedReward'
  | 'earnedRewardUntilTimestamp'
  | 'getCurrentRewardPerSecond'
  | 'getPushedRewards'
  | 'getRewardPerToken'
  | 'getStakedNFTs'
  | 'getStakedNFTsLength'
  | 'getTokensStaked'
  | 'initialize'
  | 'initializePoolRewards'
  | 'isStaked'
  | 'lastUpdateTime'
  | 'moderators'
  | 'nftRewardPerTierPaid'
  | 'onERC721Received'
  | 'owner'
  | 'pause'
  | 'paused'
  | 'periodFinish'
  | 'pixNFT'
  | 'pushRewardNextEpochsPercentages'
  | 'renounceOwnership'
  | 'rewardDistributor'
  | 'rewardPerTierStored'
  | 'rewardPercentagePaidPerTokensStaked'
  | 'rewardPercentagesDenominator'
  | 'rewardRate'
  | 'rewardToken'
  | 'rewards'
  | 'setModerator'
  | 'setPushRewardNextEpochsPercentages'
  | 'setRewardDistributor'
  | 'setRewardPercentagePaidPerTokensStaked'
  | 'setRewardToken'
  | 'stake'
  | 'stakedNFTs'
  | 'stakers'
  | 'tokenTotalRewardLastClaim'
  | 'totalTiers'
  | 'transferOwnership'
  | 'unpause'
  | 'unstake';
export interface EpochAddedEventEmittedResponse {
  epochId: BigNumberish;
  startTimestamp: BigNumberish;
  endTimestamp: BigNumberish;
  totalEpochReward: BigNumberish;
}
export interface ModeratorUpdatedEventEmittedResponse {
  moderator: string;
  approved: boolean;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PIXStakedEventEmittedResponse {
  tokenId: BigNumberish;
  account: string;
}
export interface PIXUnstakedEventEmittedResponse {
  tokenId: BigNumberish;
  account: string;
}
export interface RewardAddedEventEmittedResponse {
  reward: BigNumberish;
}
export interface RewardClaimedEventEmittedResponse {
  reward: BigNumberish;
  account: string;
}
export interface RewardClaimedTokenEventEmittedResponse {
  user: string;
  tokenId: BigNumberish;
  reward: BigNumberish;
}
export interface PIXTerritoryStaking {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DURATION(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param epochTotalReward Type: uint256, Indexed: false
   * @param epochDuration Type: uint256, Indexed: false
   */
  addEpochRewards(
    epochTotalReward: BigNumberish,
    epochDuration: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  claimAll(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenIds Type: uint256[], Indexed: false
   */
  claimBatch(
    tokenIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  currentEpoch(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  currentEpochEndTimestamp(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenIds Type: uint256[], Indexed: false
   */
  earnedBatch(
    tokenIds: BigNumberish[],
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenIds Type: uint256[], Indexed: false
   * @param untilTimestamp Type: uint256, Indexed: false
   */
  earnedBatchUntilTimestamp(
    tokenIds: BigNumberish[],
    untilTimestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  earnedByAccount(
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param untilTimestamp Type: uint256, Indexed: false
   */
  earnedByAccountUntilTimestamp(
    account: string,
    untilTimestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  earnedReward(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param untilTimestamp Type: uint256, Indexed: false
   */
  earnedRewardUntilTimestamp(
    tokenId: BigNumberish,
    untilTimestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pixSize Type: uint8, Indexed: false
   * @param pixCategory Type: uint8, Indexed: false
   */
  getCurrentRewardPerSecond(
    pixSize: BigNumberish,
    pixCategory: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pixSize Type: uint8, Indexed: false
   * @param pixCategory Type: uint8, Indexed: false
   * @param epochId Type: uint256, Indexed: false
   */
  getPushedRewards(
    pixSize: BigNumberish,
    pixCategory: BigNumberish,
    epochId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pixSize Type: uint8, Indexed: false
   * @param pixCategory Type: uint8, Indexed: false
   */
  getRewardPerToken(
    pixSize: BigNumberish,
    pixCategory: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   */
  getStakedNFTs(
    user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   */
  getStakedNFTsLength(
    user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pixSize Type: uint8, Indexed: false
   * @param pixCategory Type: uint8, Indexed: false
   */
  getTokensStaked(
    pixSize: BigNumberish,
    pixCategory: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixt Type: address, Indexed: false
   * @param _pixNFT Type: address, Indexed: false
   */
  initialize(
    _pixt: string,
    _pixNFT: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pixSize Type: uint8[], Indexed: false
   * @param pixCategory Type: uint8[], Indexed: false
   * @param rewardPercentages Type: uint256[], Indexed: false
   * @param currentStakedTokens Type: uint256[], Indexed: false
   * @param _rewardPercentagesDenominator Type: uint256, Indexed: false
   */
  initializePoolRewards(
    pixSize: BigNumberish[],
    pixCategory: BigNumberish[],
    rewardPercentages: BigNumberish[],
    currentStakedTokens: BigNumberish[],
    _rewardPercentagesDenominator: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  isStaked(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  lastUpdateTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  moderators(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  nftRewardPerTierPaid(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   * @param parameter3 Type: bytes, Indexed: false
   */
  onERC721Received(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    parameter3: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  pause(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  paused(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  periodFinish(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pixNFT(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint8, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  pushRewardNextEpochsPercentages(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rewardDistributor(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rewardPerTierStored(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  rewardPercentagePaidPerTokensStaked(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rewardPercentagesDenominator(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rewardRate(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rewardToken(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  rewards(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param moderator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setModerator(
    moderator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pixSize Type: uint8, Indexed: false
   * @param _pushRewardNextEpochsPercentages Type: uint256[], Indexed: false
   */
  setPushRewardNextEpochsPercentages(
    pixSize: BigNumberish,
    _pushRewardNextEpochsPercentages: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param distributor Type: address, Indexed: false
   */
  setRewardDistributor(
    distributor: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _rewardPercentagePaidPerTokensStaked Type: uint256[], Indexed: false
   */
  setRewardPercentagePaidPerTokensStaked(
    _rewardPercentagePaidPerTokensStaked: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param rewardTokenAddress Type: address, Indexed: false
   */
  setRewardToken(
    rewardTokenAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  stake(
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  stakedNFTs(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  stakers(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  tokenTotalRewardLastClaim(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalTiers(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(
    newOwner: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  unpause(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  unstake(
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}

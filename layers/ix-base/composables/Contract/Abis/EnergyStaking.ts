import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  EnergyStaking,
  EnergyStakingMethodNames,
  EnergyStakingEventsContext,
  EnergyStakingEvents
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
export type EnergyStakingEvents =
  | 'EnergyStaked'
  | 'EnergyUnstaked'
  | 'OwnershipTransferred'
  | 'RewardAdded'
  | 'RewardClaimed';
export interface EnergyStakingEventsContext {
  EnergyStaked(...parameters: any): EventFilter;
  EnergyUnstaked(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  RewardAdded(...parameters: any): EventFilter;
  RewardClaimed(...parameters: any): EventFilter;
}
export type EnergyStakingMethodNames =
  | '_facilityCalculation'
  | 'addCurrentEpochRewards'
  | 'claim'
  | 'earned'
  | 'earnedAmelia'
  | 'earnedAmeliaOld'
  | 'earnedOld'
  | 'energy'
  | 'getCurrentEpochEndTime'
  | 'getCurrentRewardRate'
  | 'getLastUpdateTime'
  | 'getPushedRewards'
  | 'getPushedRewardsNextEpochPercentages'
  | 'getRewardPerToken'
  | 'getTotalStakedAmount'
  | 'getTotalStakedAmountOld'
  | 'getUserAmeliaCommitment'
  | 'getUserEnergyStaked'
  | 'getUserIXTStakes'
  | 'getUserRewardPerTokenPaid'
  | 'getUserStakedAmount'
  | 'getUserTotalEnergyStaked'
  | 'getUserTotalEnergyStakedAmelia'
  | 'getUserTotalIXTStaked'
  | 'initialize'
  | 'lastUpdateTimeApplicable'
  | 'lastUpdateTimeApplicableOld'
  | 'moderators'
  | 'owner'
  | 'paused'
  | 'pixt'
  | 'renounceOwnership'
  | 'rewardPerTokenStored'
  | 'rewardPerTokenStoredOld'
  | 'rewardPool'
  | 's_epochCount'
  | 'setAmeliaFoundationShare'
  | 'setAmeliaFoundationWallet'
  | 'setEnergy'
  | 'setIXT'
  | 'setModerator'
  | 'setPaused'
  | 'setPushRewardNextEpochsPercentages'
  | 'setRewardDistributor'
  | 'setRewardPercentageDenominator'
  | 'stakeEnergy'
  | 'stakeIXT'
  | 'transferOwnership'
  | 'unstakeIXT'
  | 'unstakeOld'
  | 'userAmeliaCommitment'
  | 'userEnergyStaked'
  | 'userEnergyStakedAmelia'
  | 'userIXTStakes'
  | 'userStakedAmount'
  | 'userTotalIXTStaked';
export interface EnergyStakedEventEmittedResponse {
  account: string;
  amount: BigNumberish;
}
export interface EnergyUnstakedEventEmittedResponse {
  account: string;
  amount: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface RewardAddedEventEmittedResponse {
  _poolTotalReward: BigNumberish;
  _epochDuration: BigNumberish;
}
export interface RewardClaimedEventEmittedResponse {
  account: string;
  reward: BigNumberish;
}
export interface StakeResponse {
  amount: BigNumber;
  0: BigNumber;
  stakedAt: BigNumber;
  1: BigNumber;
}
export interface RewardPoolResponse {
  periodFinish: BigNumber;
  0: BigNumber;
  rewardRate: BigNumber;
  1: BigNumber;
  lastUpdateTime: BigNumber;
  2: BigNumber;
  rewardPerTokenStored: BigNumber;
  3: BigNumber;
  tokensStaked: BigNumber;
  4: BigNumber;
  length: 5;
}
export interface UserIXTStakesResponse {
  amount: BigNumber;
  0: BigNumber;
  stakedAt: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface EnergyStaking {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _totalRewards Type: uint256, Indexed: false
   */
  _facilityCalculation(
    _totalRewards: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _poolTotalReward Type: uint256, Indexed: false
   * @param _epochDuration Type: uint256, Indexed: false
   */
  addCurrentEpochRewards(
    _poolTotalReward: BigNumberish,
    _epochDuration: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _ameliaCommitment Type: bool, Indexed: false
   */
  claim(
    _ameliaCommitment: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _epoch Type: uint256, Indexed: false
   */
  earned(
    _walletAddress: string,
    _epoch: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _epoch Type: uint256, Indexed: false
   */
  earnedAmelia(
    _walletAddress: string,
    _epoch: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  earnedAmeliaOld(
    _walletAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  earnedOld(
    _walletAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  energy(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentEpochEndTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentRewardRate(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLastUpdateTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _epoch Type: uint256, Indexed: false
   */
  getPushedRewards(
    _epoch: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getPushedRewardsNextEpochPercentages(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getRewardPerToken(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getTotalStakedAmount(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getTotalStakedAmountOld(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  getUserAmeliaCommitment(
    _walletAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   */
  getUserEnergyStaked(
    _user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   */
  getUserIXTStakes(
    _user: string,
    overrides?: ContractCallOverrides
  ): Promise<StakeResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  getUserRewardPerTokenPaid(
    _walletAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  getUserStakedAmount(
    _walletAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   */
  getUserTotalEnergyStaked(
    _user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   */
  getUserTotalEnergyStakedAmelia(
    _user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   */
  getUserTotalIXTStaked(
    _user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixt Type: address, Indexed: false
   * @param _energy Type: address, Indexed: false
   */
  initialize(
    _pixt: string,
    _energy: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _untilTimeStamp Type: uint256, Indexed: false
   * @param _epoch Type: uint256, Indexed: false
   */
  lastUpdateTimeApplicable(
    _untilTimeStamp: BigNumberish,
    _epoch: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _untilTimeStamp Type: uint256, Indexed: false
   */
  lastUpdateTimeApplicableOld(
    _untilTimeStamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
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
  pixt(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param _epoch Type: uint256, Indexed: false
   */
  rewardPerTokenStored(
    _epoch: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rewardPerTokenStoredOld(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  rewardPool(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<RewardPoolResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_epochCount(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _share Type: uint256, Indexed: false
   * @param _totalBps Type: uint256, Indexed: false
   */
  setAmeliaFoundationShare(
    _share: BigNumberish,
    _totalBps: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  setAmeliaFoundationWallet(
    _walletAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _energy Type: address, Indexed: false
   */
  setEnergy(
    _energy: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixt Type: address, Indexed: false
   */
  setIXT(
    _pixt: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * @param _paused Type: bool, Indexed: false
   */
  setPaused(
    _paused: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pushRewardNextEpochsPercentages Type: uint256[], Indexed: false
   */
  setPushRewardNextEpochsPercentages(
    _pushRewardNextEpochsPercentages: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _distributor Type: address, Indexed: false
   */
  setRewardDistributor(
    _distributor: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _denominator Type: uint256, Indexed: false
   */
  setRewardPercentageDenominator(
    _denominator: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amount Type: uint256, Indexed: false
   * @param _ameliaCommitment Type: bool, Indexed: false
   */
  stakeEnergy(
    _amount: BigNumberish,
    _ameliaCommitment: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amount Type: uint256, Indexed: false
   */
  stakeIXT(
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * @param _amount Type: uint256, Indexed: false
   */
  unstakeIXT(
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amount Type: uint256, Indexed: false
   * @param _ameliaCommitment Type: bool, Indexed: false
   */
  unstakeOld(
    _amount: BigNumberish,
    _ameliaCommitment: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  userAmeliaCommitment(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  userEnergyStaked(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  userEnergyStakedAmelia(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  userIXTStakes(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UserIXTStakesResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  userStakedAmount(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  userTotalIXTStaked(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
}

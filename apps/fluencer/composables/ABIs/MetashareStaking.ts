import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  MetashareStaking,
  MetashareStakingMethodNames,
  MetashareStakingEventsContext,
  MetashareStakingEvents
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
export type MetashareStakingEvents =
  | 'MetashareStaked'
  | 'MetashareUnstaked'
  | 'OwnershipTransferred'
  | 'RewardAdded'
  | 'RewardClaimed';
export interface MetashareStakingEventsContext {
  MetashareStaked(...parameters: any): EventFilter;
  MetashareUnstaked(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  RewardAdded(...parameters: any): EventFilter;
  RewardClaimed(...parameters: any): EventFilter;
}
export type MetashareStakingMethodNames =
  | 'claim'
  | 'claimBatch'
  | 'claimOnEthereum'
  | 'connext'
  | 'earned'
  | 'earnedBatch'
  | 'earnedByAccount'
  | 'earnedByAccountUntilTimestamp'
  | 'earnedUntilTimestamp'
  | 'getStakedAmounts'
  | 'getStakedIDs'
  | 'getTokensStakedPerPool'
  | 'initialize'
  | 'initializePools'
  | 'lastTimeRewardApplicable'
  | 'moderators'
  | 'onERC1155BatchReceived'
  | 'onERC1155Received'
  | 'owner'
  | 'paused'
  | 'renounceOwnership'
  | 'rewardPerToken'
  | 'rewardPerTokenFromNow'
  | 'setEthAddress'
  | 'setPaused'
  | 'setRewardDistributor'
  | 'setRewardToken'
  | 'setStakeableIds'
  | 'stake'
  | 'stakeable_ids'
  | 'supportsInterface'
  | 'transferOwnership'
  | 'unstake'
  | 'xReceive';
export interface MetashareStakedEventEmittedResponse {
  account: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
}
export interface MetashareUnstakedEventEmittedResponse {
  account: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface RewardAddedEventEmittedResponse {
  tokenId: BigNumberish;
  reward: BigNumberish;
}
export interface RewardClaimedEventEmittedResponse {
  account: string;
  reward: BigNumberish;
}
export interface MetashareStaking {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  claim(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param relayerFee Type: uint256, Indexed: false
   * @param returnRelayerFee Type: uint256, Indexed: false
   */
  claimOnEthereum(
    relayerFee: BigNumberish,
    returnRelayerFee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  connext(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  earned(
    _walletAddress: string,
    _tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   */
  earnedBatch(
    _walletAddress: string,
    _tokenIds: BigNumberish[],
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  earnedByAccount(
    _walletAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _untilTimestamp Type: uint256, Indexed: false
   */
  earnedByAccountUntilTimestamp(
    _walletAddress: string,
    _untilTimestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _untilTimestamp Type: uint256, Indexed: false
   */
  earnedUntilTimestamp(
    _walletAddress: string,
    _tokenId: BigNumberish,
    _untilTimestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  getStakedAmounts(
    _walletAddress: string,
    _tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   */
  getStakedIDs(
    _walletAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getTokensStakedPerPool(
    _tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixt Type: address, Indexed: false
   * @param _metashares Type: address, Indexed: false
   * @param _connext Type: address, Indexed: false
   */
  initialize(
    _pixt: string,
    _metashares: string,
    _connext: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _poolRewards Type: uint256[], Indexed: false
   * @param _epochDuration Type: uint256, Indexed: false
   */
  initializePools(
    _tokenIds: BigNumberish[],
    _poolRewards: BigNumberish[],
    _epochDuration: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _untilTimestamp Type: uint256, Indexed: false
   */
  lastTimeRewardApplicable(
    _tokenId: BigNumberish,
    _untilTimestamp: BigNumberish,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256[], Indexed: false
   * @param parameter3 Type: uint256[], Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  onERC1155BatchReceived(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish[],
    parameter3: BigNumberish[],
    parameter4: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   * @param parameter3 Type: uint256, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  onERC1155Received(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    parameter3: BigNumberish,
    parameter4: Arrayish,
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  paused(overrides?: ContractCallOverrides): Promise<boolean>;
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
   * @param _tokenId Type: uint256, Indexed: false
   * @param _untilTimestamp Type: uint256, Indexed: false
   */
  rewardPerToken(
    _tokenId: BigNumberish,
    _untilTimestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _untilTimestamp Type: uint256, Indexed: false
   */
  rewardPerTokenFromNow(
    _tokenId: BigNumberish,
    _untilTimestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _ethereumStaking Type: address, Indexed: false
   */
  setEthAddress(
    _ethereumStaking: string,
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
   * @param _rewardToken Type: address, Indexed: false
   */
  setRewardToken(
    _rewardToken: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _isValid Type: bool, Indexed: false
   */
  setStakeableIds(
    _tokenIds: BigNumberish[],
    _isValid: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  stake(
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  stakeable_ids(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(
    interfaceId: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
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
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  unstake(
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _transferId Type: bytes32, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   * @param _asset Type: address, Indexed: false
   * @param _originSender Type: address, Indexed: false
   * @param _origin Type: uint32, Indexed: false
   * @param _callData Type: bytes, Indexed: false
   */
  xReceive(
    _transferId: Arrayish,
    _amount: BigNumberish,
    _asset: string,
    _originSender: string,
    _origin: BigNumberish,
    _callData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}

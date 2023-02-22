import { BigNumber } from 'ethers';

export const Decimals = BigNumber.from(18);
export const OneToken = BigNumber.from(10).pow(Decimals);

export const ERC20TOKEN_ADDRESS = '0xdB00e37aaFEE1f427fE6D524866BE1c6abf3B195';
export const ICO_ADDRESS = '0xd1149A77cb3c8F79B5Bad55cC88B0F0079f61dE7';
export const STAKING_ADDRESS = '0xB3CEd96a3c509DbDa6b9679728f79b0f9EB859AF';

export const ERC721TOKEN_ADDRESS = '0x8FEBa051D0f0f763Ad81fccD67969E3C38BE1366';
export const MARKETPLACE_ADDRESS = '0xE03c274011ab38013aAFc3500fEE250Cd1eA4E1c';

export const CHAIN_ID = 5;

export const CHAIN_INFO = {
  chainId: '0x5',
  rpcUrls: ['https://endpoints.omniatech.io/v1/eth/goerli/public'],
  chainName: 'Goerli test network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://goerli.etherscan.io'],
};

export const EVENT_INFO = {
  Transfer: {
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  },
  NewListing: {
    abi: {
      anonymous: false,
      name: 'NewListing',
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'listId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'price',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'currency',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      outputs: [],
      type: 'event',
      stateMutability: 'nonpayable',
    },
    topic: '0x6f6ddf8366b3114f911e188b474e5c606683a37c78ddb0b6c240aa40034e30fe',
  },
};

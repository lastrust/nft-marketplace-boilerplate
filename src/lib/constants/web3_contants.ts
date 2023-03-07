import { BigNumber } from 'ethers';

export const Decimals = BigNumber.from(18);
export const OneToken = BigNumber.from(10).pow(Decimals);

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

# Boilerplate for NFT marketplace

This boilerplate is for NFT marketplace.
Using this boilerplate, you can create NFT marketplace website.

![img_20.png](imgs/img_20.png)

![img_21.png](imgs/img_21.png)

![img_22.png](imgs/img_22.png)

# How to create this application?

## Deploy smart contracts

### [Deploy ERC721 token contract](https://app.bunzz.dev/module-templates/a50a356b-84b4-4ca1-aa21-432a73d11e1f)

Please deploy ERC721 token contract

- Click `Create Dapp` box

![img_2.png](imgs/img_2.png)

- Input DApp name

![img_23.png](imgs/img_23.png)

- Select the chain you want to deploy the contracts on.

![img_4.png](imgs/img_4.png)

- Search and select one of ERC721 token modules

If you have already an ERC721 token, you can skip this.

![img_24.png](imgs/img_24.png)

- Search and select [Marketplace(NFT-ETH)](https://app.bunzz.dev/module-templates/9011d43b-d345-4f66-8729-be5b660a86b5)

![img_25.png](imgs/img_25.png)

- Input token name, symbol and baseTokenURI. (If you didn't select ERC721 module, you don't need to add the token name and symbol).

![img_26.png](imgs/img_26.png)

- Clicking `Deploy` button, you can deploy the smart contracts using metamask wallet.

![img_27.png](imgs/img_27.png)

## Create NFT marketplace

### Clone NFT marketplace boilerplate repository.

Clone [this repository](https://github.com/lastrust/nft-marketplace-boilerplate)

```
git clone https://github.com/lastrust/nft-marketplace-boilerplate
```

### Install app

```
cd nft-marketplace-boilerplate

yarn install
```

### Add contract addresses

Please update `src/lib/web3_constants.ts` file with the smart contract addresses you deployed.

```
import { BigNumber } from 'ethers';

export const Decimals = BigNumber.from(18);
export const OneToken = BigNumber.from(10).pow(Decimals);

export const ERC721TOKEN_ADDRESS = '';
export const MARKETPLACE_ADDRESS = '';

export const CHAIN_ID = ; // numeric

export const CHAIN_INFO = {
  chainId: '', // hex
  rpcUrls: [''],
  chainName: '',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://goerli.etherscan.io'],
};

```

### Run application

Development mode

```
yarn dev
```

Production mode

```
yarn build
yarn start
```

![img_20.png](imgs/img_20.png)

Now you can use this application.

To learn more, please ask in [our discord](https://discord.gg/wCFUV6rNd7)
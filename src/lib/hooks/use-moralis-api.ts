import { CHAIN_ID, ERC721TOKEN_ADDRESS } from '@/lib/constants/web3_contants';
import { useEvmWalletNFTs, useEvmContractNFTs } from '@moralisweb3/next';
import { EvmNft } from '@moralisweb3/common-evm-utils';

export const useMoralisApi = (address: string) => {
  const myNFTOptions = {
    chain: CHAIN_ID,
    tokenAddresses: [ERC721TOKEN_ADDRESS],
    address: address,
  };
  let data: any;
  try {
    data = useEvmWalletNFTs(myNFTOptions);
  } catch (e) {
    data = undefined;
  }
  const myNfts = data ? data.data : [];

  const contractNFTOptions = {
    chain: CHAIN_ID,
    address: ERC721TOKEN_ADDRESS,
  };
  let contractNFTData: any;
  try {
    contractNFTData = useEvmContractNFTs(contractNFTOptions);
  } catch (e) {
    contractNFTData = undefined;
  }
  const nfts = contractNFTData ? contractNFTData.data : [];

  const getTokenData = (tokenId: string | string[] | undefined) => {
    const _nfts = nfts?.filter((nft: EvmNft) => {
      return nft.tokenId == tokenId;
    });
    if (_nfts?.length > 0) return _nfts[0];
    else return false;
  };
  return {
    myNfts,
    nfts,
    getTokenData,
    ERC721TOKEN_ADDRESS,
  };
};

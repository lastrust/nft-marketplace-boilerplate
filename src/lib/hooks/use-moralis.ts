import Moralis from 'moralis';

interface MoralisAPIPayload {
  chain: string;
  address: string;
}

const useMoralis = (option: MoralisAPIPayload) => {
  const fetchNFTs = async () => {
    const res = await Moralis.EvmApi.nft.getContractNFTs({
      address: option.address,
      chain: option.chain,
    });
    return res;
  };

  return [fetchNFTs];
};

export default useMoralis;

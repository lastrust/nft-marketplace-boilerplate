import { useEffect, useState } from 'react';
import { Contract, BigNumber as BN } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import ICO_ABI from '../../assets/abis/ico.json';
import { toast } from 'react-toastify';
import { MARKETPLACE_ABI } from '@/lib/constants/abis/marketplace';
import { MARKETPLACE_ADDRESS, OneToken } from '@/lib/constants/web3_contants';
import { useERC721Contract } from '@/lib/hooks/use-erc721-contract';
import { EvmNft } from 'moralis/common-evm-utils';
import { ListingDataType, NFTDataType } from '@/types';
import { useMap } from 'react-use';
import { useMoralisApi } from '@/lib/hooks/use-moralis-api';

export const useMarketplceContract = (
  provider: Web3Provider | undefined,
  address: string
) => {
  const [marketplaceContract] = useState<Contract>(
    new Contract(
      MARKETPLACE_ADDRESS,
      MARKETPLACE_ABI.abi,
      provider?.getSigner()
    )
  );
  const { isApproved, approveToken } = useERC721Contract(provider, address);
  const { myNfts, nfts, getTokenData } = useMoralisApi(address);
  const getTokenListing = async (tokenId: number | string) => {
    try {
      const listingId = await marketplaceContract.tokensListing(tokenId);
      return Number(listingId.toString());
    } catch (error) {
      return 0;
    }
  };

  const getListing = async (listingId: number | string | BN) => {
    try {
      const listing = await marketplaceContract.listings(listingId);
      console.log('listing', listing);
      return listing;
    } catch (error) {
      return null;
    }
  };

  const [saleItems, setSaleItems] = useState<Array<ListingDataType>>([]);

  const getListingFromTokenId = async (tokenId: number | string) => {
    const listingId = await marketplaceContract.tokensListing(tokenId);
    if (listingId == BN.from(0)) return null;
    return await getListing(listingId);
  };

  const getTokenListingFromMyNFTs = async () => {
    if (saleItems.length == 0) return;
    const _saleItems: Array<ListingDataType> = [];
    for (let i = 0; i < myNfts?.length; i++) {
      const listing = await getListingFromTokenId(myNfts[i].tokenId);
      if (listing.exist) {
        _saleItems.push(listing);
      }
    }
    setSaleItems(_saleItems);
  };

  if (myNfts) {
    getTokenListingFromMyNFTs().then();
  }

  const [listings, setListings] = useState<Array<ListingDataType>>([]);

  const getListings = async (from: number, num: number) => {
    const _listings: Array<ListingDataType> = [];
    for (let i = from; i < from + num; i++) {
      const listing = await getListing(i);
      if (listing.exist) {
        _listings.push(listing);
      }
    }
    setListings([...listings, ..._listings]);
  };

  const getPrice = async (tokenId: number | string) => {
    if (!tokenId) return '0';
    const listingId = await marketplaceContract.tokensListing(tokenId);
    if (listingId == BN.from(0)) return '0';
    const listing = await getListing(listingId);
    if (listing?.exist) {
      return listing.price.toString();
    } else return '0';
  };

  const changePrice = async (tokenId: number, amount: number) => {
    if (amount == 0) return;
    try {
      const tx = await marketplaceContract.changePrice(
        tokenId,
        OneToken.mul(amount * 1000000).div(1000000)
      );
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('Price change successful!');
    } catch (error) {
      console.log(error);
      toast.error('Price change failed.');
    }
  };

  const list = async (tokenId: number, amount: number) => {
    if (amount == 0) return;
    if (!(await isApproved(MARKETPLACE_ADDRESS, tokenId)))
      await approveToken(MARKETPLACE_ADDRESS, tokenId);
    if (!(await isApproved(MARKETPLACE_ADDRESS, tokenId))) return;
    try {
      const tx = await marketplaceContract.list(
        tokenId,
        OneToken.mul(amount * 1000000).div(1000000)
      );
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('List successful!');
    } catch (error) {
      console.log(error);
      toast.error('List failed.');
    }
  };

  const buy = async (tokenId: number | string) => {
    if (!(await isApproved(MARKETPLACE_ADDRESS, tokenId))) return;
    try {
      const tx = await marketplaceContract.buy(
        tokenId,
        OneToken.mul(amount * 1000000).div(1000000)
      );
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('List successful!');
    } catch (error) {
      console.log(error);
      toast.error('List failed.');
    }
  };

  return {
    MARKETPLACE_ADDRESS,
    marketplaceContract,
    myNfts,
    nfts,
    listings,
    list,
    changePrice,
    getTokenListing,
    getTokenListingFromMyNFTs,
    getListingFromTokenId,
    saleItems,
    getListings,
    getPrice,
  };
};

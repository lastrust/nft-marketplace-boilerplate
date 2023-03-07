import { useState } from 'react';
import { BigNumber as BN, Contract } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { toast } from 'react-toastify';
import { MARKETPLACE_ABI } from '@/lib/constants/abis/marketplace';
import { MARKETPLACE_ADDRESS, OneToken } from '@/lib/constants/web3_contants';
import { useERC721Contract } from '@/lib/hooks/use-erc721-contract';
import { EvmNft } from 'moralis/common-evm-utils';
import { ListingDataType } from '@/types';
import { useMoralisApi } from '@/lib/hooks/use-moralis-api';
import { LISTING_COUNT } from '@/lib/constants';

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
  const { myNfts, nfts } = useMoralisApi(address);
  const [saleItems, setSaleItems] = useState<Array<ListingDataType>>([]);
  const [unListedNFTs, setUnlistedNFTs] = useState<Array<EvmNft>>([]);
  const [listings, setListings] = useState<Array<ListingDataType>>([]);
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
      return await marketplaceContract.listings(listingId);
    } catch (error) {
      return null;
    }
  };

  const getUnListedNFTs = (_saleItems: Array<ListingDataType>) => {
    const _unListedNFTs = myNfts.filter((item: EvmNft) => {
      const _items = _saleItems.filter(
        (_item) => item.tokenId.toString() == _item.tokenId.toString()
      );
      return _items.length == 0;
    });
    setUnlistedNFTs(_unListedNFTs);
  };

  const getListingFromTokenId = async (tokenId: number | string) => {
    const listingId = await marketplaceContract.tokensListing(tokenId);
    if (listingId == BN.from(0)) return null;
    return await getListing(listingId);
  };

  const getTokenListingFromMyNFTs = async () => {
    if (saleItems.length > 0) return;
    const _saleItems: Array<ListingDataType> = [];
    for (let i = 0; i < myNfts?.length; i++) {
      const listing = await getListingFromTokenId(myNfts[i].tokenId);
      if (listing.exist) {
        _saleItems.push(listing);
      }
    }
    setSaleItems(_saleItems);
    getUnListedNFTs(_saleItems);
  };

  if (myNfts?.length > 0) {
    getTokenListingFromMyNFTs().then();
  }

  const getListings = async (from: number, num: number) => {
    const _listings: Array<ListingDataType> = [];
    for (let i = from; i < from + num; i++) {
      const listing = await getListing(i);
      if (listing?.exist && !listing?.isSold) {
        _listings.push(listing);
      }
    }
    setListings([...listings, ..._listings]);
  };

  const resetListings = async (from: number, num: number) => {
    const _listings: Array<ListingDataType> = [];
    for (let i = from; i < from + num; i++) {
      const listing = await getListing(i);
      if (listing?.exist && !listing?.isSold) {
        _listings.push(listing);
      }
    }
    setListings([..._listings]);
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
        OneToken.mul(amount * 100000000).div(100000000)
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

  const removeList = async (tokenId: number | string) => {
    try {
      const tx = await marketplaceContract.cancelListing(tokenId);
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('Remove list successful!');
    } catch (error) {
      console.log(error);
      toast.error('Remove list failed.');
    }
  };

  const buy = async (tokenId: number | string, price: BN) => {
    if (!(await isApproved(MARKETPLACE_ADDRESS, tokenId))) return;
    try {
      const tx = await marketplaceContract.buy(tokenId, {
        value: price,
      });
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('Buy successful!');
      await resetListings(0, LISTING_COUNT);
    } catch (error) {
      console.log(error);
      toast.error('Buy failed.');
    }
  };

  return {
    MARKETPLACE_ADDRESS,
    marketplaceContract,
    myNfts,
    nfts,
    listings,
    saleItems,
    unListedNFTs,
    list,
    changePrice,
    buy,
    getTokenListing,
    getTokenListingFromMyNFTs,
    getListingFromTokenId,
    getListings,
    getPrice,
    resetListings,
    removeList,
  };
};

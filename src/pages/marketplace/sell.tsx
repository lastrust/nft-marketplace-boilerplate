import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Card from '@/components/ui/card';
import { NextPageWithLayout } from '@/types';
import MarketPlaceLayout from '@/layouts/maketplace/layout';
import { useContext } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useERC721Contract } from '@/lib/hooks/use-erc721-contract';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { useMarketplceContract } from '@/lib/hooks/use-marketplace-contract';

const MarketPlaceSell: NextPageWithLayout = () => {
  const [floorPrice] = useState<number>(20);
  const [totalTrade] = useState<number>(210022);

  const { getProvider, address } = useContext(WalletContext);
  const provider = getProvider();
  const { myNfts, saleItems, getTokenListingFromMyNFTs } =
    useMarketplceContract(provider, address);
  return (
    <>
      <NextSeo
        title="Bunzz - Marketplace"
        description="Bunzz - Marketplace Sell"
      />
      <section className="flex items-center gap-x-12 border-b-2 border-gray-300 py-10">
        <div className="flex flex-col gap-y-1">
          <h2>{floorPrice} ETH</h2>
          <p className="text-gray-400">floor price</p>
        </div>
        <div className="flex flex-col gap-y-1">
          <h2>{totalTrade}</h2>
          <p className="text-gray-400">total trades</p>
        </div>
      </section>
      <section className="border-b-2 border-gray-300 pt-7 pb-5">
        <h2>Your NFT&apos;s for sale</h2>
        <div className="my-5 flex flex-wrap gap-4">
          {saleItems?.map((item) => {
            return (
              <React.Fragment key={`${item.name}_${item.tokenId}`}>
                <Card
                  tokenId={item.tokenId.toString()}
                  price={item.price.toString()}
                  cardType="CHANGE_PRICE"
                  cn="max-w-[250px]"
                />
              </React.Fragment>
            );
          })}
        </div>
      </section>
      <section className="pt-7 pb-5">
        <h2>Your NFT&apos;s</h2>
        <div className="my-5 flex flex-wrap gap-4">
          {myNfts?.map((item) => {
            return (
              <React.Fragment key={`${item.name}_${item.tokenId}`}>
                <Card tokenId={item.tokenId.toString()} cardType="SELL" cn="max-w-[250px]" />
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};
MarketPlaceSell.getLayout = function getLayout(page) {
  return <MarketPlaceLayout>{page}</MarketPlaceLayout>;
};
export default MarketPlaceSell;

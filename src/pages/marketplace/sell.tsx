import React from 'react';
import { NextSeo } from 'next-seo';
import Card from '@/components/ui/card';
import { NextPageWithLayout } from '@/types';
import MarketPlaceLayout from '@/layouts/maketplace/layout';
import { useContext } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useMarketplceContract } from '@/lib/hooks/use-marketplace-contract';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { BigNumber } from 'ethers';

const MarketPlaceSell: NextPageWithLayout = () => {
  // const [floorPrice] = useState<number>(20);
  // const [totalTrade] = useState<number>(210022);

  const { getProvider, address } = useContext(WalletContext);
  const provider = getProvider();
  const { unListedNFTs, saleItems } = useMarketplceContract(provider, address);
  return (
    <>
      <NextSeo
        title="Bunzz - Marketplace"
        description="Bunzz - Marketplace Sell"
      />
      {/*<section className="flex items-center gap-x-12 border-b-2 border-gray-300 py-10 px-10">*/}
      {/*  <div className="flex flex-col gap-y-1 rounded-md bg-white p-4 shadow">*/}
      {/*    <h2>{floorPrice} ETH</h2>*/}
      {/*    <p className="text-gray-400">floor price</p>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col gap-y-1 rounded-md bg-white p-4 shadow">*/}
      {/*    <h2>{totalTrade}</h2>*/}
      {/*    <p className="text-gray-400">total trades</p>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <section className="border-b-2 border-gray-300 px-10 pt-7 pb-5">
        <h2>Your NFT&apos;s for sale</h2>
        <div className="my-5 flex flex-wrap gap-4">
          {saleItems?.map((item) => {
            return (
              <React.Fragment key={`${item.name}_${item.tokenId}`}>
                <Card
                  tokenId={item.tokenId.toString()}
                  price={item.price}
                  cardType="CHANGE_PRICE"
                  cn="max-w-[250px]"
                />
              </React.Fragment>
            );
          })}
        </div>
      </section>
      <section className="px-10 pt-7 pb-5">
        <h2>Your NFT&apos;s</h2>
        <div className="my-5 flex flex-wrap gap-4">
          {unListedNFTs?.map((item: EvmNft) => {
            return (
              <React.Fragment key={`${item.name}_${item.tokenId}`}>
                <Card
                  tokenId={item.tokenId}
                  cardType="SELL"
                  cn="max-w-[250px]"
                  price={BigNumber.from(0)}
                />
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

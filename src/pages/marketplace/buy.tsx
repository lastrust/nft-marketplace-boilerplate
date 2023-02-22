import React, { useState, useEffect, useContext } from 'react';
import { NextSeo } from 'next-seo';
import { breakPoints } from '@/lib/hooks/use-breakpoint';
import Button from '@/components/ui/button/button';
import Card from '@/components/ui/card';
import { NextPageWithLayout, NFTDataType } from '@/types';
import demoData from '../../data/demo.json';
import useLoading from '@/lib/hooks/use-loading';
import FullPageLoading from '@/components/ui/loading/full-page-loading';
import MarketPlaceLayout from '@/layouts/maketplace/layout';
import { useMarketplceContract } from '@/lib/hooks/use-marketplace-contract';
import { WalletContext } from '@/lib/hooks/use-connect';
import { ethers } from 'ethers';

const MarketPlaceBuy: NextPageWithLayout = () => {
  const [isLoading, showLoading, hideLoading] = useLoading();
  const { getProvider, address } = useContext(WalletContext);
  const provider = getProvider();
  const {
    myNfts,
    saleItems,
    getTokenListingFromMyNFTs,
    getListings,
    listings,
  } = useMarketplceContract(provider, address);
  const [numPerRow, setNumPerRow] = useState<number>(0);
  const loadMore = () => {
    showLoading();
    getListings(itemNumber, 5).then();
    hideLoading();
    setItemNumber(itemNumber + 5);
  };

  const [itemNumber, setItemNumber] = useState<number>(0);

  useEffect(() => {
    getListings(itemNumber, 5).then();
    setItemNumber(itemNumber + 5);

    const handleWindowResize = () => {
      const width = window.innerWidth;
      if (width >= breakPoints['3xl']) {
        setNumPerRow(6);
      } else if (width < breakPoints['3xl'] && width >= breakPoints['2xl']) {
        setNumPerRow(6);
      } else if (width < breakPoints['2xl'] && width >= breakPoints.xl) {
        setNumPerRow(5);
      } else if (width < breakPoints.xl && width >= breakPoints.lg) {
        setNumPerRow(3);
      } else if (width < breakPoints.lg && width >= breakPoints.md) {
        setNumPerRow(3);
      } else if (width < breakPoints.md && width >= breakPoints.sm) {
        setNumPerRow(2);
      } else if (width < breakPoints.sm && width >= breakPoints.xs) {
        setNumPerRow(2);
      } else {
        setNumPerRow(1);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <>
      <NextSeo
        title="Bunzz - Marketplace"
        description="Bunzz Marketplace Buy"
      />
      <div className={`my-10 grid custom-grid-cols-${numPerRow} gap-4 py-10`}>
        {listings?.map((item) => {
          return (
            <React.Fragment key={`${item.tokenId}`}>
              <Card
                tokenId={item.tokenId.toString()}
                price={ethers.utils.formatUnits(item.price, 18)}
              />
            </React.Fragment>
          );
        })}
      </div>
      <Button
        color="primary"
        size="small"
        className="mx-auto"
        onClick={() => loadMore()}
      >
        Load More
      </Button>
      {isLoading && <FullPageLoading />}
    </>
  );
};

MarketPlaceBuy.getLayout = function getLayout(page) {
  return <MarketPlaceLayout>{page}</MarketPlaceLayout>;
};

export default MarketPlaceBuy;

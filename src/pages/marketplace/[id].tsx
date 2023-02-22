import BoxArrowUpRightIcon from '@/components/icons/box-arrow-up-right';
import ReloadIcon from '@/components/icons/reload';
import ShareIcon from '@/components/icons/share';
import ThreeDotsIcon from '@/components/icons/threedots';
import Button from '@/components/ui/button/button';
import MinimalLayout from '@/layouts/_minimal';
import { NFTDataType, NextPageWithLayout, AttributeType } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import { useContext, useState } from "react";
import { useMoralisApi } from '@/lib/hooks/use-moralis-api';
import { useRouter } from 'next/router';
import ErrorPage from "@/pages/404";
import { WalletContext } from "@/lib/hooks/use-connect";
import { useMarketplceContract } from "@/lib/hooks/use-marketplace-contract";

const NFTDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getProvider, address } = useContext(WalletContext);
  const provider = getProvider();
  const { getTokenData } = useMoralisApi(address);
  const { getPrice } = useMarketplceContract(provider, address);
  const data = getTokenData(id);
  const [price, setPrice] = useState<string>('0');
  getPrice(data.tokenId).then((_price) => {
    setPrice(_price);
  });
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <>
      <NextSeo title={data.name} description="Bunzz - Staking Boilerplate" />
      <div className="flex w-full flex-col gap-y-5 gap-x-10 px-5 xs:flex-row xs:gap-y-0 2xl:px-56">
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full gap-x-5">
            <div className="w-full">
              <img
                src={data.metadata.image}
                className="rounded-xl bg-white p-5"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <Button color="white" shape="circle">
                <ShareIcon />
              </Button>
              <Button color="white" shape="circle">
                <ThreeDotsIcon />
              </Button>
              <Button color="white" shape="circle">
                <BoxArrowUpRightIcon />
              </Button>
              <Button color="white" shape="circle">
                <ReloadIcon />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <h3 className="">{data.name} # {data.tokenId}</h3>
            <sub className="text-gray-400">Owned by</sub>
            <sub>{data.ownerOf}</sub>
          </div>
          <p>Current Price</p>
          <h1>
            {price} ETH
            {/*<span className="text-base text-gray-400">$100.05</span>*/}
          </h1>
          <Button
            shape="rounded"
            variant="solid"
            size="small"
            className="w-[150px]"
          >
            Buy
          </Button>
        </div>

        <div className="flex w-full flex-col gap-y-5">
          <div className="flex w-full flex-col gap-y-3 rounded-xl bg-white p-5">
            <h2>Description</h2>
            <p>
              {data.metadata.description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-y-3 rounded-xl bg-white p-5">
            <h2>Properties</h2>
            {data.metadata.attributes.map((item: AttributeType) => {
              return (
                <div className="flex w-full items-center">
                  <span className="w-1/3">{item.trait_type}</span>
                  <span className="w-1/3">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

NFTDetailPage.getLayout = function getLayout(page) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default NFTDetailPage;

import { useModal } from '@/components/modal-views/context';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import Button from '../button/button';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useMoralisApi } from '@/lib/hooks/use-moralis-api';
import { BigNumber, ethers } from 'ethers';
import { useMarketplceContract } from '@/lib/hooks/use-marketplace-contract';
import useLoading from '@/lib/hooks/use-loading';
import FullPageLoading from '@/components/ui/loading/full-page-loading';

type CardType = 'SELL' | 'BUY' | 'CHANGE_PRICE';

interface CardProps {
  cn?: string;
  tokenId: string | number;
  price: BigNumber;
  cardType?: CardType;
}

const Card: FC<CardProps> = ({
  cn,
  tokenId,
  cardType = 'BUY',
  price = BigNumber.from(0),
}) => {
  const [isLoading, showLoading, hideLoading] = useLoading();
  const router = useRouter();
  const { getProvider, address } = useContext(WalletContext);
  const provider = getProvider();
  const { buy, removeList } = useMarketplceContract(provider, address);
  const { getTokenData } = useMoralisApi(address);
  const nftItem = getTokenData(tokenId.toString());
  if (!nftItem) return null;

  const [generalPrice, setGeneralPrice] = useState<string>();

  useEffect(() => {
    setGeneralPrice(ethers.utils.formatUnits(price, 18));
  });

  let btnText: string;
  const { openModal, data } = useModal();
  switch (cardType) {
    case 'SELL':
      btnText = 'Sell';
      break;
    case 'CHANGE_PRICE':
      btnText = 'Change price';
      break;
    default:
      btnText = 'Buy';
      break;
  }
  const handleSubmit = (item: EvmNft) => {
    if (cardType === 'CHANGE_PRICE')
      openModal('CHANGE_PRICE', { tokenId: item.tokenId, generalPrice });
    else if (cardType === 'SELL') openModal('SET_NEW_PRICE', item);
    else {
      showLoading();
      buy(tokenId, price).then(() => {
        hideLoading();
        router.reload();
      });
    }
  };
  const removeItemFromListing = (item: EvmNft) => {
    showLoading();
    removeList(item.tokenId).then();
    hideLoading();
  };
  const showDetail = () => {
    router.push(`/marketplace/${nftItem.tokenId}`);
  };

  useEffect(() => {
    if (data?.generalPrice) setGeneralPrice(data.generalPrice);
  }, [data?.generalPrice]);

  return (
    <>
      <div
        className={`${cn} cursor-pointer rounded-xl bg-white p-5 shadow-card`}
      >
        <div className="relative w-full">
          <img
            className="rounded-lg bg-gray-100"
            src={nftItem.metadata?.image}
            alt={nftItem.name}
            onClick={() => showDetail()}
          />
        </div>
        <p className="mt-2 font-semibold text-gray-600">
          {nftItem.name} # {nftItem.tokenId}
        </p>
        <p className="text-gray-400">{nftItem.ownerOf?.format()}</p>
        {price > BigNumber.from(0) && (
          <p className="my-2 font-semibold text-gray-600">{generalPrice} ETH</p>
        )}
        <Button
          className="mt-5"
          size="block"
          color="primary"
          shape="rounded"
          onClick={() => handleSubmit(nftItem)}
        >
          {btnText}
        </Button>
        {cardType == 'CHANGE_PRICE' && (
          <a
            className="mx-auto mt-3 flex cursor-pointer justify-center underline"
            onClick={() => removeItemFromListing(nftItem)}
          >
            Remove listing
          </a>
        )}
      </div>
      {isLoading && <FullPageLoading />}
    </>
  );
};

export default Card;

import { useModal } from '@/components/modal-views/context';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import Button from '../button/button';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { WalletContext } from "@/lib/hooks/use-connect";
import { useMoralisApi } from "@/lib/hooks/use-moralis-api";

type CardType = 'SELL' | 'BUY' | 'CHANGE_PRICE';

interface CardProps {
  cn?: string;
  tokenId: string;
  price: string;
  cardType?: CardType;
}

const Card: FC<CardProps> = ({
  cn,
  tokenId,
  cardType = 'BUY',
  price = '0',
}) => {
  const router = useRouter();
  const { getProvider, address } = useContext(WalletContext);
  const provider = getProvider();
  const { getTokenData } = useMoralisApi(address);
  const nftItem = getTokenData(tokenId);
  if (!nftItem) return null;

  let btnText = '';
  const { openModal } = useModal();
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
      openModal('CHANGE_PRICE', { tokenId: item.tokenId });
    else if (cardType === 'SELL') openModal('SET_NEW_PRICE', item);
  };
  const showDetail = () => {
    router.push(`/marketplace/${nftItem.tokenId}`);
  };

  return (
    <>
      <div
        className={`${cn} cursor-pointer rounded-xl bg-white p-5 shadow-card`}
      >
        <div className="relative w-full">
          <img
            className="rounded-lg bg-gray-100 p-2"
            src={nftItem.metadata?.image}
            alt={nftItem.name}
            onClick={() => showDetail()}
          />
        </div>
        <p className="mt-2 font-semibold text-gray-600">{nftItem.name} # {nftItem.tokenId}</p>
        <p className="text-gray-400">{nftItem.ownerOf?.format()}</p>
        <p className="my-2 font-semibold text-gray-600">
          {price} ETH
        </p>
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
          <a className="mx-auto mt-3 flex cursor-pointer justify-center underline">
            Remove listing
          </a>
        )}
      </div>
    </>
  );
};

export default Card;

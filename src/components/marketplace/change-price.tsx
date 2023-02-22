import { Close } from '../icons/close';
import { useModal } from '../modal-views/context';
import Button from '../ui/button/button';
import InputLabel from '../ui/input-label';
import Input from '../ui/forms/input';
import { FC, useContext, useState } from 'react';
import { NFTDataType } from '@/types';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useMarketplceContract } from '@/lib/hooks/use-marketplace-contract';

type NFT_STATUS = 'ON_SALE' | 'READY_FOR_SALE';
interface ChangePriceViewProps {
  nftStatus: NFT_STATUS;
}

const ChangePriceView: FC<ChangePriceViewProps> = ({ nftStatus }) => {
  const { closeModal, data } = useModal();
  const tokenId = data.tokenId;
  const [price, setPrice] = useState<number>(data?.price ? data.price : 0);
  console.log(tokenId, price);
  let headerTxt = 'Change the price';
  let btnTxt = 'Change';
  switch (nftStatus) {
    case 'READY_FOR_SALE':
      headerTxt = 'Set new price';
      btnTxt = 'Save';
      break;
    default:
      break;
  }
  const updatePrice = async () => {
    if (nftStatus == 'READY_FOR_SALE') {
      await list(tokenId, price);
    } else {
      await changePrice(tokenId, price);
    }
    data.price = price;
    closeModal();
  };

  const { getProvider, address } = useContext(WalletContext);
  const provider = getProvider();
  const { marketplaceContract, MARKETPLACE_ADDRESS, list, changePrice } =
    useMarketplceContract(provider, address);

  return (
    <>
      <div className="flex min-w-[360px] flex-col rounded-xl bg-white p-8">
        <div className="mb-7 flex items-center justify-between">
          <h3>{headerTxt}</h3>
          <Button
            color="white"
            variant="ghost"
            shape="circle"
            onClick={closeModal}
          >
            <Close className="h-4 w-4" />
          </Button>
        </div>

        <InputLabel title="Price" />
        <Input
          defaultValue={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
          pattern="[+-]?([0-9]*[.])?[0-9]+"
          type="text"
          placeholder="Enter the amount of token to buy"
          inputClassName="spin-button-hidden"
        />
        <Button
          className="mt-4"
          variant="solid"
          size="block"
          shape="rounded"
          onClick={() => updatePrice()}
        >
          {btnTxt}
        </Button>
      </div>
    </>
  );
};

export default ChangePriceView;

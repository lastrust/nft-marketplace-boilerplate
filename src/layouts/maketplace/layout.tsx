import React, { FC } from 'react';
import MinimalLayout from '@/layouts/_minimal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from '@/components/ui/select';

interface Props {
  children: React.ReactNode;
}

const MarketPlaceLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const sortOptions = [
    { id: 0, name: 'Low to High', value: 'Low to High', group: 'price' },
    { id: 1, name: 'High to Low', value: 'High to Low', group: 'price' },
    { id: 2, name: 'Low to High', value: 'Low to High', group: 'rarity' },
    { id: 3, name: 'High to Low', value: 'High to Low', group: 'rarity' },
  ];
  return (
    <>
      <MinimalLayout>
        <div className="relative">
          <div className="flex flex-row border-b-2 border-gray-300">
            <span
              className={`border-b-2 border-gray-400 px-5 py-2  text-gray-600 ${
                router.pathname.includes('buy')
                  ? 'border-b-2 font-semibold'
                  : 'border-none'
              }`}
            >
              <Link href={'/marketplace/buy'}>BUY</Link>
            </span>
            <span
              className={`border-gray-400 px-5 py-2 text-gray-600 ${
                router.pathname.includes('sell')
                  ? 'border-b-2 font-semibold'
                  : 'border-none'
              }`}
            >
              <Link href={'/marketplace/sell'}>SELL</Link>
            </span>
          </div>
          {/*<div className="absolute right-10 top-0 flex items-center gap-x-5 text-sm">*/}
          {/*  <Select*/}
          {/*    selectType="GROUP_SELECT"*/}
          {/*    cn="min-w-[200px] px-3 py-2 bg-white rounded-md"*/}
          {/*    optionBoardCn="py-2 bg-white rounded-md"*/}
          {/*    options={sortOptions}*/}
          {/*    optionCn="hover:bg-gray-200"*/}
          {/*    groupCn="text-gray-400"*/}
          {/*    placeholder="Sort by"*/}
          {/*    onSelect={(val) => {*/}
          {/*      console.log(val);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*  <span>{Number(demoData.totalNFTs).toLocaleString()} items</span>*/}
          {/*</div>*/}
        </div>
        {children}
      </MinimalLayout>
    </>
  );
};

export default MarketPlaceLayout;

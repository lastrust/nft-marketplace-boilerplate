import { CHAIN_ID, ERC721TOKEN_ADDRESS } from '@/lib/constants/web3_contants';
import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { ERC721_ABI } from '@/lib/constants/abis/erc721';
import { toast } from 'react-toastify';

export const useERC721Contract = (
  provider: Web3Provider | undefined,
  address: string
) => {
  const [erc721Contract] = useState<Contract>(
    new Contract(ERC721TOKEN_ADDRESS, ERC721_ABI.abi, provider?.getSigner())
  );
  const isApproved = async (
    spenderAddress: string,
    tokenId: number | string
  ) => {
    try {
      const _spenderAddress = await erc721Contract.getApproved(tokenId);
      return spenderAddress == _spenderAddress;
    } catch (error) {
      return false;
    }
  };
  const approveToken = async (spenderAddress: string, tokenId: number) => {
    try {
      const tx = await erc721Contract.approve(spenderAddress, tokenId);
      console.log(tx);
      await tx.wait();
      toast('Token approve successful!');
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Token approve failed.');
      return false;
    }
  };
  return {
    ERC721TOKEN_ADDRESS,
    approveToken,
    isApproved,
  };
};

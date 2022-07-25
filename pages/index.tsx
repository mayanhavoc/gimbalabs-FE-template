import {
  Box, Heading, Text
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Mesh from "@martifylabs/mesh";
import Head from 'next/head'
import Image from 'next/image'

import ConnectWallet from '../components/wallet/connectWallet';

const Home: NextPage = () => {

  const [walletConnected, setWalletConnected] = useState<null | string>(null);
  const [connectedAddress, setConnectAddress] = useState<null | string>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const _address = await Mesh.wallet.getWalletAddress();
      setConnectAddress(_address);
    }

    if(walletConnected) {
      fetchAddress();
    }

  }, [walletConnected])

  return (
    <Box>
      <Heading>
        Task 1: Make sure that you can connect your wallet to this dapp
      </Heading>
      <Box m='5' p='5' bg='#435689' color='#ffffff'>
        <ConnectWallet
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
        />
        {connectedAddress ?
          (<Text fontSize='xl'>Congratulations! You are connected to {walletConnected} wallet at address: {connectedAddress}</Text>)
        :
          (<Text fontSize='xl'>No wallet is connected yet. Try clicking on the button above.</Text>)
        }
      </Box>
    </Box>
  )
}

export default Home

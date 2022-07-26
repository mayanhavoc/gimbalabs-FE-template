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

    if (walletConnected) {
      fetchAddress();
    }

  }, [walletConnected])

  return (
    <Box>
      <Heading>
        Task #1:
      </Heading>
      <Heading size='lg' pt='3'>
        Make sure that you can connect your wallet to this dapp
      </Heading>
      <Box m='5' p='5' bg='teal.900' color='white'>
        <ConnectWallet
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
        />
        {connectedAddress ?
          (
            <Box w='80%' mx='auto' my='5' p='5' bg='green.200' color='black'>
              <Text fontSize='xl'>Congratulations! You are connected to {walletConnected} wallet at address: {connectedAddress}</Text>
            </Box>
          ) : (
            <Box w='40%' mx='auto' my='5' p='5' bg='red.200' color='black'>
              <Text fontSize='xl'>No wallet is connected yet. Try clicking on the button above.</Text>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}

export default Home

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
  const [connectedAddress, setConnectedAddress] = useState<null | string>(null);
  const [currentNetwork, setCurrentNetwork] = useState<"Testnet" | "Mainnet" | "Not Connected">("Not Connected");

  useEffect(() => {
    const fetchAddress = async () => {
      const _address = await Mesh.wallet.getWalletAddress();
      setConnectedAddress(_address);
    }

    const fetchNetwork = async () => {
      const _network = await Mesh.wallet.getNetworkId();
      if (_network === 0){
        setCurrentNetwork("Testnet")
      }
      else if (_network === 1){
        setCurrentNetwork("Mainnet")
      }
    }

    if (walletConnected) {
      fetchAddress();
      fetchNetwork();
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
      <Box m='5' p='5' bg='teal.700' color='white'>
        <ConnectWallet
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
        />
        {connectedAddress ?
          (
            <Box w='80%' mx='auto' my='5' p='5' bg='green.100' color='black'>
              <Text fontSize='xl'>Congratulations! You are connected to {walletConnected} wallet on {currentNetwork} at address: {connectedAddress}</Text>
            </Box>
          ) : (
            <Box w='80%' mx='auto' my='5' p='5' bg='red.100' color='black'>
              <Text fontSize='xl'>No wallet is connected yet. Try clicking the button above.</Text>
            </Box>
          )
        }
      </Box>
      <Heading size='lg' pt='3'>
        So, how does this work?
      </Heading>
      <Text fontSize='lg' py='3'>
        In Lesson 202.2, we'll take a look at the code for this page.
      </Text>
    </Box>
  )
}

export default Home

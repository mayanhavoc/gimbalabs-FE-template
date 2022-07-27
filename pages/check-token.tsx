import {
  Box, Heading, Text,
  Button, ButtonGroup,
  Code
} from '@chakra-ui/react'
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Mesh from "@martifylabs/mesh";
import Head from 'next/head'
import Image from 'next/image'

import ConnectWallet from '../components/wallet/connectWallet';

const policyId = "1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f9"

const CheckToken: NextPage = () => {

  const [walletConnected, setWalletConnected] = useState<null | string>(null);
  const [assets, setAssets] = useState<null | any>(null);
  const [numberPPBLTokens, setNumberPPBLTokens] = useState<number>(0)

  useEffect(() => {
    const fetchAssets = async () => {
      const _assets = await Mesh.wallet.getAssets({});
      setAssets(_assets);
    }

    if (walletConnected) {
      fetchAssets();
    }

  }, [walletConnected])

  useEffect(() => {
    if (assets) {
      let value = 0;
      const result = assets.find((elem: { policy: string; }) => elem.policy === policyId);
      if (result) {
        value = result.quantity
      }
      setNumberPPBLTokens(value)
    }
  }, [assets])

  return (
    <Box>
      <Heading>
        Task #2:
      </Heading>
      <Heading size='lg' pt='3'>
        Do you have the PPBLSummer2022 Token?
      </Heading>
      <Box m='5' p='5' bg='teal.700' color='#ffffff'>
        <ConnectWallet
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
        />

        {numberPPBLTokens > 0 ? (
          <Box w='80%' mx='auto' my='5' p='5' bg='green.100' color='black'>
            <Text fontSize='xl'>Congratulations! You have {numberPPBLTokens} PPBLSummer2022 Token(s)!</Text>
          </Box>
        ) : (
          <Box w='80%' mx='auto' my='5' p='5' bg='red.100' color='black'>
            <Text fontSize='xl'>This dapp cannot find a PPBLSummer2022 token. Make sure that your wallet is connected to Testnet and that it contains at least one asset with the Policy ID: {policyId}.</Text>
          </Box>
        )}

      </Box>
      <Heading size='md' py='3'>
        Note: this example is built for a Cardano Testnet token, so make sure that your wallet is connected to Testnet.
      </Heading>
    </Box>
  )
}

export default CheckToken

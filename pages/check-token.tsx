import {
  Box, Heading, Text, Spinner, Center
} from '@chakra-ui/react'
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import useWallet from '../contexts/wallet';

// You can change this policyId to match any token.
// 1. Try changing it to match a token that you minting in Module 201
// 2. Can you get this page to work with a token on Cardano mainnet?
const policyId = "1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f9"

const CheckToken: NextPage = () => {
  const { connecting, walletNameConnected, connectWallet, walletConnected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any[]>(null);
  const [numberPPBLTokens, setNumberPPBLTokens] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  // Whenever the state of walletConnected changes, this useEffect hook will run
  // Retrieves a list of all assets in a connected wallet.
  useEffect(() => {

    const fetchAssets = async () => {
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }

    if (walletConnected) {
      setLoading(true)
      fetchAssets();
    }
  }, [walletConnected])

  // Whenever the list of assets changes, this useEffect hook will run
  // Looks for any assets matching the policyId variable specified at the top of this file
  useEffect(() => {
    if (assets) {
      let value = 0;
      const result = assets.find((elem: { policyId: string; }) => elem.policyId === policyId);
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
        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            {numberPPBLTokens > 0 ? (
              <Box w='80%' mx='auto' my='5' p='5' bg='green.100' color='black'>
                <Text fontSize='xl'>Congratulations! You have {numberPPBLTokens} PPBLSummer2022 Token(s)!</Text>
              </Box>
            ) : (
              <Box w='80%' mx='auto' my='5' p='5' bg='red.100' color='black'>
                <Text fontSize='xl'>This dapp cannot find a PPBLSummer2022 token. Make sure that your wallet is connected to Testnet and that it contains at least one asset with the Policy ID: {policyId}.</Text>
              </Box>
            )}
          </>
        )}
      </Box>
      <Heading size='md' py='3'>
        Note: this example is built for a Cardano Testnet token, so make sure that your wallet is connected to Testnet.
      </Heading>
    </Box>
  )
}

export default CheckToken

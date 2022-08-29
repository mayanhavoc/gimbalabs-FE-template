import {
  Box, Heading, Text, Spinner, Center
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import useWallet from '../contexts/wallet';
import FaucetUnlockingComponent from '../components/faucets/FaucetUnlockingComponent';
import FaucetLockingComponent from '../components/faucets/FaucetLockingComponent';
import FaucetMetadataRegistration from '../components/faucets/FaucetMetadataRegistration';
import DummyUnlockingPlaceholder from '../components/faucets/DummyUnlockingPlaceholder'

const Faucets: NextPage = () => {
  const { walletNameConnected, walletConnected, wallet, connectedAddress } = useWallet();

  const [currentNetwork, setCurrentNetwork] = useState<"Testnet" | "Mainnet" | "Not Connected">("Not Connected");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    const fetchNetwork = async () => {
      const _network = await wallet.getNetworkId();
      if (_network === 0) {
        setCurrentNetwork("Testnet")
      }
      else if (_network === 1) {
        setCurrentNetwork("Mainnet")
      }
      setLoading(false);
    }

    if (walletConnected) {
      setLoading(true);
      fetchNetwork();
    }

  }, [walletConnected])

  return (
    <Box>
      <Heading>
        Project 301 - Faucets
      </Heading>
      <Heading size='lg' pt='3'>
        Make sure that you can connect your wallet to this dapp
      </Heading>
      <Box my='5' p='5' bg='teal.700' color='white'>
        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            {walletConnected ?
              (
                <Box w='80%' mx='auto' my='5' p='5' bg='green.100' color='black'>
                  <Text fontSize='xl'>Congratulations! You are connected to {walletNameConnected} wallet on {currentNetwork} at address: {connectedAddress}</Text>
                </Box>
              ) : (
                <Box w='80%' mx='auto' my='5' p='5' bg='red.100' color='black'>
                  <Text fontSize='xl'>No wallet is connected yet. Try clicking the button above.</Text>
                </Box>
              )
            }
          </>
        )}
      </Box>
      <FaucetLockingComponent />
      <DummyUnlockingPlaceholder />
    </Box>
  )
}

export default Faucets

import {
    Box, Heading, Text, Link, Button, Spinner, Center
  } from '@chakra-ui/react'
  import { useEffect, useState } from "react";
  import useWallet from '../../contexts/wallet';
  
  export default function Section202Part1() {
    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
  
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
      <Box p='3' bg='blue.100'>
        <Heading>
          Section 202.1
        </Heading>
        <Heading size='lg' pt='3'>
          Make sure that you can connect your wallet to this dapp
        </Heading>
        <Link href="https://gimbalabs.instructure.com/courses/26/pages/202-dot-1-run-plutus-pbl-front-end-template-locally">
          <Button>View on Canvas</Button>
        </Link>
        <Box m='5' p='5' bg='teal.700' color='white'>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              {walletConnected ?
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
            </>
          )}
        </Box>
        <Heading size='lg' pt='3'>
          How does this work?
        </Heading>
        <Text fontSize='lg' py='3'>
          <Link href="https://gimbalabs.instructure.com/courses/26/pages/202-dot-2-conditionally-render-a-web-page-with-a-cardano-token">In Lesson 202.2</Link>, we'll take a look at the code for this page.
        </Text>
        <Heading size='lg' pt='3'>
          Need Eternl Wallet?
        </Heading>
        <Text fontSize='lg' py='3'>
          You can use <Link href="https://eternl.io/app/preprod/welcome">Eternl Wallet on Cardano Pre-Production Testnet</Link>.
        </Text>
      </Box>
    )
  }
  
  
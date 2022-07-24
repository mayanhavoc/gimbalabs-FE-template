import { 
    Box, Heading, Text,
    Button, ButtonGroup,
    Code 
  } from '@chakra-ui/react'
  import { useState } from "react";
  import type { NextPage } from "next";
  import Mesh from "@martifylabs/mesh";
  import Head from 'next/head'
  import Image from 'next/image'
  
  const TokenHolders: NextPage = () => {
  
    async function connectWallet(walletName: string) {
        let connected = await Mesh.wallet.enable({ walletName: walletName });
    }

    return (
      <Box>
        <Heading>
          List of Holders of PPBLCourse2022 Token on Cardano Testnet
        </Heading>
        <Box m='5' p='5' bg='#435689' color='#ffffff'>
          <Heading size='lg'>
            One way to get a list of holders is to reference the sending transactions.
          </Heading>
          <Text>
            Todo: show query results here.
          </Text>
        </Box>
        <Box m='5' p='5' bg='#435689' color='#ffffff'>
          <Heading size='lg'>
            Another way is to query the policy id
          </Heading>
          <Text>
            To do: show query results here.
          </Text>
        </Box>
        <Box m='5' p='5' bg='#435689' color='#ffffff'>
          <Heading>
            Which token is YOURS?
          </Heading>
          <Button colorScheme='red' onClick={() => connectWallet("ccvault")}>
            Connect Wallet to Find Out
          </Button>
        </Box>
      </Box>
    )
  }
  
  export default TokenHolders
  
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
import HoldersByTx from '../components/queryResults/holdersByTx';
import HoldersByAssetID from '../components/queryResults/holdersByAssetID';

const TokenHolders: NextPage = () => {

  async function connectWallet(walletName: string) {
    let connected = await Mesh.wallet.enable({ walletName: walletName });
  }

  return (
    <Box>
      <Heading>
        Preview #1:
      </Heading>
      <Heading size='lg' pt='3'>
        List of Holders of PPBLCourse2022 Token on Cardano Testnet
      </Heading>
      <Heading size='lg' pt='3'>
        COMING SOON!
      </Heading>

      <HoldersByTx />
      <HoldersByAssetID />

      <Box m='5' p='5' bg='blue.800' color='white'>
        <Heading py='5'>
          Which token is YOURS? (Coming soon)
        </Heading>
        <Button colorScheme='red' onClick={() => connectWallet("ccvault")}>
          Connect Wallet to Find Out
        </Button>
      </Box>
    </Box>
  )
}

export default TokenHolders

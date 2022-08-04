import {
  Box, Heading, Text,
} from '@chakra-ui/react'
import type { NextPage } from "next";
import HoldersByTx from '../components/queryResults/holdersByTx';
import HoldersByAssetID from '../components/queryResults/holdersByAssetID';

const TokenHolders: NextPage = () => {

  return (
    <Box>
      <Heading>
        Preview #1:
      </Heading>
      <Heading size='lg' pt='3'>
        List of Holders of PPBLCourse2022 Token on Cardano Testnet
      </Heading>
      <Heading size='md' pt='3'>
        This page will be updated frequently over the next few weeks. What do you want it to do?
      </Heading>

      <HoldersByAssetID />
      <HoldersByTx />

    </Box>
  )
}

export default TokenHolders

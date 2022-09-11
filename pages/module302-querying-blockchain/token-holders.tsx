import {
  Box, Heading, Text, Link
} from '@chakra-ui/react'
import type { NextPage } from "next";
import HoldersByTx from '../../components/queryResults/holdersByTx';
import HoldersByAssetID from '../../components/queryResults/holdersByAssetID';

const TokenHolders: NextPage = () => {

  return (
    <Box>
      <Heading>
        Example Queries:
      </Heading>
      <Heading size='lg' pt='3'>
        List of Holders of PPBLCourse2022 Token 
      </Heading>
      <Text fontSize='lg' pt='3'>
        What additional queries would you like to see on this page? The <Link href='https://gimbalabs.instructure.com/courses/26/assignments/465' color='orange.700'>Mastery Assignments in Module 302</Link> provide opportunities to practice adding your own.
      </Text>

      <HoldersByAssetID />
      <HoldersByTx />

    </Box>
  )
}

export default TokenHolders

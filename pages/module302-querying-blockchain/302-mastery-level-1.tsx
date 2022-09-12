import { Box, Heading, Text, Grid, GridItem, Link as ChakraLink } from '@chakra-ui/react'
import type { NextPage } from "next";
import Head from 'next/head'
import Link from 'next/link'
import HoldersByAssetID from '../../components/queryResults/holdersByAssetID';
import HoldersByTx from '../../components/queryResults/holdersByTx';
import Mastery302dot1Template from '../../components/queryResults/mastery302dot1Template';
import MetadataExampleQuery from '../../components/queryResults/metadataExampleQuery';

const Module302MasteryLevel1: NextPage = () => {
    return (
        <Box>
            <Heading>Module 302: Querying the Blockchain</Heading>
            <Mastery302dot1Template />
        </Box>

    )
}

export default Module302MasteryLevel1
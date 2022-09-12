import { Box, Heading, Text, Grid, GridItem, Link as ChakraLink } from '@chakra-ui/react'
import type { NextPage } from "next";
import Head from 'next/head'
import Link from 'next/link'
import HoldersByAssetID from '../../components/queryResults/holdersByAssetID';
import HoldersByTx from '../../components/queryResults/holdersByTx';
import MetadataExampleQuery from '../../components/queryResults/metadataExampleQuery';

const Module302: NextPage = () => {
    return (
        <Box>
            <Heading>Module 302: Querying the Blockchain</Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap='3' pt='5'>
                <GridItem bg='purple.100' _hover={{ bg: 'purple.800', color: 'white' }}>
                    <Text p='3'>
                        <Link href="/templates/isr">Mastery Level 1</Link>
                    </Text>
                </GridItem>
                <GridItem bg='purple.100' _hover={{ bg: 'purple.800', color: 'white' }}>
                    <Text p='3'>
                        <Link href="/templates/ssr">Mastery Level 2</Link>
                    </Text>
                </GridItem>
                <GridItem bg='purple.100' _hover={{ bg: 'purple.800', color: 'white' }}>
                    <Text p='3'>
                        <Link href="/templates/csr">Mastery Level 3</Link>
                    </Text>
                </GridItem>
                <GridItem bg='purple.100' _hover={{ bg: 'purple.800', color: 'white' }}>
                    <Text p='3'>
                        Mastery Level 4: Your task is to...
                    </Text>
                </GridItem>
            </Grid>
            <Heading py='5'>Some (Not-So-Pretty) Examples</Heading>
            <MetadataExampleQuery />
            <HoldersByAssetID />
            <HoldersByTx />
        </Box>

    )
}

export default Module302
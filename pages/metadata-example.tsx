import {
    Box, Heading, Text
} from '@chakra-ui/react'
import type { NextPage } from "next";
import Mesh from "@martifylabs/mesh";
import MetadataExampleQuery from '../components/queryResults/metadataExampleQuery';


const MetadataExample: NextPage = () => {

    async function connectWallet(walletName: string) {
        let connected = await Mesh.wallet.enable({ walletName: walletName });
    }

    return (
        <Box>
            <Heading>
                Preview #2:
            </Heading>
            <Heading size='lg' pt='3'>
                Example Metadata Query
            </Heading>
            <Heading size='md' pt='3'>
                In PPBL Module 203, you will build a transaction that adds metadata to this page.
            </Heading>
            <MetadataExampleQuery />
        </Box>
    )
}

export default MetadataExample

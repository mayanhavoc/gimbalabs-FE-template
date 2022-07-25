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
import MetadataExampleQuery from '../components/queryResults/metadataExampleQuery';


const MetadataExample: NextPage = () => {

    async function connectWallet(walletName: string) {
        let connected = await Mesh.wallet.enable({ walletName: walletName });
    }

    return (
        <Box>
            <Heading>
                Preview #2: Example Metadata Query
            </Heading>

            <MetadataExampleQuery />

        </Box>
    )
}

export default MetadataExample

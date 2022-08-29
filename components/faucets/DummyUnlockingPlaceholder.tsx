import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import type { UTxO, Asset, Data, Action } from '@martifylabs/mesh'

import {
    Box, Button, Center, Heading, Spinner, Text,
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";
import { TransactionService, BlockfrostProvider, resolveDataHash } from '@martifylabs/mesh'
// Use these type to check against 3rd party query
// Review other Types
import { tgimbal } from "../../cardano/plutus/pre-prod-faucet-tgimbal"

const QUERY = gql`
    query UtxosAtAddress($contractAddress: String!) {
        utxos(where : {address : { _eq : $contractAddress }}){
            txHash
            index
            value
            tokens {
                asset {
                    policyId
                    assetName
                }
                quantity
            }
        }
    }
`;

export default function DummyUnlockingPlaceholder() {
    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            contractAddress: tgimbal.address
        }
    });

    if (loading) return (
        <Text>{JSON.stringify(loading)}</Text>
    )

    if (error) return (
        <Text>{JSON.stringify(error)}</Text>
    )

    return (
        <Box my='5' p='5' bg='purple.900' color='white'>
            <Text>
                New component...for {tgimbal.address}
            </Text>
            <Text>
                {JSON.stringify(data)}
            </Text>

        </Box>
    );
}

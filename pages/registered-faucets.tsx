import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
    Box, Heading, Text, Spinner, Center
} from '@chakra-ui/react'

import { FaucetMetadata } from "../cardano/Types";
import FaucetUnlockingComponentWithMetadata from "../components/faucets/FaucetUnlockingComponentWithMetadata";

// 1. Consume data from metadata query
// 2. Use that data to populate placeholder component
// 3. Create a TS type (?) so that we can effectively pass it to Unlocking Component
// 4. Pass info to Unlocking Component

const QUERY = gql`
    query TransactionsWithMetadataKey($metadatakey: String!) {
        transactions(
            where: { metadata: { key: {_eq: $metadatakey} } }
            order_by: { includedAt: desc }
        ) {
            hash
            includedAt
            metadata {
                key
                value
            }
        }
    }
`;

export default function RegisteredFaucets() {
    const queryThisMetadataKey: string = "1618033988"
    let metadataResults: FaucetMetadata[] = []

    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            metadatakey: queryThisMetadataKey
        }
    });

    if (loading) {
        return (
            <Center p='10'>
                <Spinner size='xl' speed="1.0s" />
            </Center>
        );
    };

    if (error) {
        console.error(error);
        return (
            <Heading size="lg">Error loading data...</Heading>
        );
    };

    // TODO: add a guard for incorrect metadata
    if (data) {
        data.transactions.forEach((tx: any) => {
            const result: FaucetMetadata = {
                datumInt: tx.metadata[0].value.datumInt,
                policyId: tx.metadata[0].value.policyId,
                tokenName: tx.metadata[0].value.tokenName,
                contractAddress: tx.metadata[0].value.contractAddress,
                withdrawalAmount: tx.metadata[0].value.withdrawalAmount,
                plutusScriptFileName: tx.metadata[0].value.plutusScriptFileName,
            }
            metadataResults.push(result)
        })
    }

    return (
        <Box p='2' bg='black' color='white'>
            <Heading size='lg' py='3'>
                List of PPBL Faucets
            </Heading>
            <Heading size='md' py='1'>
                Add Yours! Look at Module 301 on Canvas.
            </Heading>

            {metadataResults.length > 0 ? (
                <Text>
                    {metadataResults.map((faucetDetails: FaucetMetadata) =>
                        <FaucetUnlockingComponentWithMetadata faucetInstance={faucetDetails} />
                    )}
                </Text>
            ) : (
                <Text>
                    No Data!
                </Text>
            )}
        </Box>
    );

}

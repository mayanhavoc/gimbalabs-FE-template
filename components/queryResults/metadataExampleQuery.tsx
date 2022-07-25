import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { Box, Heading, Text } from "@chakra-ui/react"

// WITH VARIABLE:
const QUERY = gql`
    query TransactionsWithMetadataKey($metadatakey: String!) {
        transactions(
            where: { metadata: { key: {_eq: $metadatakey} } }
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

export default function MetadataExampleQuery() {
    const queryThisMetadataKey: string = "1618033988"

    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            metadatakey: queryThisMetadataKey
        }
    });

    if (loading) {
        return (
            <Heading size="lg">Loading data...</Heading>
        );
    };

    if (error) {
        console.error(error);
        return (
            <Heading size="lg">Error loading data...</Heading>
        );
    };

    return (
        <Box m='5' p='5' bg='#435689' color='#ffffff'>
            <Heading size='lg' py='3'>
                Some Metadata Query Results
            </Heading>
            <Heading size='md' py='1'>
                This is an example response from querying key {queryThisMetadataKey} on Cardano Mainnet
            </Heading>
            {data.transactions.map((tx: any | null | undefined) => (
                <Box m='2' p='2' bg='white' color='black'>
                    <Text>Tx Hash: {tx.hash}</Text>
                    <Text>Tx Date: {tx.includedAt}</Text>
                    {tx.metadata.map((metadata: any) => (
                        <Text p='1'>
                            The key is {JSON.stringify(metadata.key)} and the value is {JSON.stringify(metadata.value)}
                        </Text>
                    ))}
                </Box>
            ))}
        </Box>
    );
}

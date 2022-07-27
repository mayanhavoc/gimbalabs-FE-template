import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { Box, Heading, Text } from "@chakra-ui/react"

// WITH VARIABLE:
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

export default function MetadataExampleQuery() {
    const queryThisMetadataKey: string = "1618033"

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
                This is an example response from querying key {queryThisMetadataKey} on Cardano Testnet
            </Heading>
            {data.transactions.map((tx: any | null | undefined) => (
                <Box m='2' px='2' pt='3' pb='5' bg='white' color='black'>
                    <Text>Tx Hash: {tx.hash}</Text>
                    <Text>Tx Date: {tx.includedAt}</Text>
                    <Heading size='md' py='2'>Tx Metadata:</Heading>
                    {tx.metadata.map((metadata: any) => (
                        <Text py='1' color='green.700'>
                            key: {JSON.stringify(metadata.key)} value: {JSON.stringify(metadata.value)}
                        </Text>
                    ))}
                </Box>
            ))}
        </Box>
    );
}

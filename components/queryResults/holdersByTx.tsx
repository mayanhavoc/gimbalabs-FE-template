import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';

import {
    Flex, Center, Heading, Text, Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

// This works, just wait for Dandelion Testnet to be up and running again.

// WITH VARIABLE:
// const QUERY = gql`
//     query AddressesBalances($addr : [String]!){
//         paymentAddresses(addresses: $addr) {
//             address
//             summary {
//                 assetBalances {
//                     asset {
//                         policyId
//                     }
//                     quantity
//                 }
//             }
//         }
//     }
// `;


// ANOTHER QUERY (NO VARIABLE):
const QUERY = gql`
    query gimbalTransactions {
        transactions(where : { _and : [
            { inputs : { address : {_eq: "addr1qx2h42hnke3hf8n05m2hzdaamup6edfqvvs2snqhmufv0eryqhtfq6cfwktmrdw79n2smpdd8n244z8x9f3267g8cz6shnc9au"}}},
            { outputs: { tokens: { asset: { policyId : { _eq: "2b0a04a7b60132b1805b296c7fcb3b217ff14413991bf76f72663c30" }}}}}
        ]}) {
            hash
            includedAt
            outputs {
            address
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
    }
`;


export default function HoldersByTx() {
    // const addresses = ["addr1qx2h42hnke3hf8n05m2hzdaamup6edfqvvs2snqhmufv0eryqhtfq6cfwktmrdw79n2smpdd8n244z8x9f3267g8cz6shnc9au"]

    // EXAMPLE WITH VARIABLE
    // const { data, loading, error } = useQuery(QUERY, {
    //     variables: {
    //         addr: addresses
    //     }
    // });

    // EXAMPLE WITHOUT VARIABLE
    const { data, loading, error } = useQuery(QUERY);

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
        <Box m="5" p="5" bg="green.200">
            <Heading>Some Results</Heading>
            <Text>
                {JSON.stringify(data)}
            </Text>
        </Box>
    )
}
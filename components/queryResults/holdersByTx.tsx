import { useQuery, gql } from "@apollo/client";

import {
    Flex, Center, Heading, Text, Box
} from "@chakra-ui/react";


const QUERY = gql`
    query AssetQuery($tokenPolicyId: Hash28Hex!) {
        transactions(where : { outputs : {tokens : { asset : { policyId : { _eq : $tokenPolicyId }}}} }) {
            includedAt
            outputs {
                address
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
    const policyId = "1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f9"

    // EXAMPLE WITH VARIABLE
    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            tokenPolicyId: policyId
        }
    });

    // EXAMPLE WITHOUT VARIABLE
    // const { data, loading, error } = useQuery(QUERY);

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
            <Heading size='2xl'>Querying Transactions with GraphQL:</Heading>
            <Text p='2'>Made with a <a href="https://graphql-api.testnet.dandelion.link/">GraphQL query, hosted by Dandelion</a>.</Text>
            {data.transactions.map((tx: any) => (<Box m='5' p='5' bg='purple.900' color='white'>{JSON.stringify(tx)}</Box>))}
        </Box>
    )
}
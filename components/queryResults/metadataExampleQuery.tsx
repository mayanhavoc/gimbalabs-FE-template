import { useQuery, gql } from "@apollo/client";
import { Box, Heading, Text, Center, Spinner } from "@chakra-ui/react"

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
            <Center p='10'>
                <Spinner size='xl' speed="1.0s"/>
            </Center>
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
                <Box my='5' px='2' pt='3' pb='5' bg='white' color='black'>
                    <Text>Tx Hash: <a href={`https://testnet.cardanoscan.io/transaction/${tx.hash}`}>{tx.hash}</a></Text>
                    <Text>Tx Date: {tx.includedAt}</Text>
                    <Heading size='md' py='2'>Tx Metadata:</Heading>
                    <Box m='3' p='3' bg='gray.800' color='green.100'>
                        {tx.metadata.map((metadata: any) => (
                            <Text py='1'>
                                key: {JSON.stringify(metadata.key)} value: {JSON.stringify(metadata.value)}
                            </Text>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

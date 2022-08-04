import { useEffect, useState } from "react";
import {
    Box, Heading, Text, Center, Spinner,
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption
} from "@chakra-ui/react"

export default function HoldersByAssetID() {

    const [addressList, setAddressList] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://testnet.koios.rest/api/v0/asset_address_list?_asset_policy=1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f9&_asset_name=5050424c53756d6d657232303232')
            .then((res) => res.json())
            .then((data) => {
                setAddressList(data)
                setLoading(false)
            })
    }, [])

    return (
        <Box m='5' p='5' bg='gray.300'>
            <Heading size='2xl'>
                Retrieve a list of addresses with a Koios Query
            </Heading>
            <Text p='2'>
                Made with <a href="https://testnet.koios.rest/#get-/asset_address_list">https://testnet.koios.rest/#get-/asset_address_list</a>
            </Text>
            {isLoading ? (
                <Center p='10'>
                    <Spinner />
                </Center>
            ) : (
                <TableContainer bg='blue.800' color='white'>
                    <Table variant='simple' fontSize='md'>
                        <Thead>
                            <Tr bg='blue.200'>
                                <Th>Address</Th>
                                <Th isNumeric># PPBLSummer2022</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {addressList?.map((addr: any) => (
                                <Tr>
                                    <Td><pre>{addr?.payment_address}</pre></Td>
                                    <Td isNumeric>{addr?.quantity}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

import { useEffect, useState } from "react";
import {
    Box, Heading, Text,
} from "@chakra-ui/react"

export default function TransactionTemplate() {

    return (
        <Box w='80%' mx='auto' my='5' p='5' bg='orange.200'>
            <Heading size='xl'>
                Tx Template
            </Heading>
            <Text py='3'>
                What other transactions can we build?
            </Text>
            <Text py='3'>
                Look at how addresses are handled in the Transaction API at the <a href="https://mesh.martify.io/apis/transaction">Mesh Playground</a>
            </Text>
        </Box>
    );
}
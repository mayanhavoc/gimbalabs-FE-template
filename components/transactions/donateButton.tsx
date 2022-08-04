import { useEffect, useState } from "react";
import {
    Box, Heading, Text,
} from "@chakra-ui/react"

export default function DonateButton() {

    return (
        <Box w='80%' mx='auto' my='5' p='5' bg='orange.200'>
            <Heading size='xl'>
                Donate Button
            </Heading>
            <Text py='5'>
                One of the simplest transactions we can create is a "donate" button. Anyone who clicks it will send 5 tAda to some address.
            </Text>
        </Box>
    );
}

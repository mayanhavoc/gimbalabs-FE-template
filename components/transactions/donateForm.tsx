import { useEffect, useState } from "react";
import {
    Box, Heading, Text,
} from "@chakra-ui/react"

export default function DonateForm() {

    return (
        <Box w='80%' mx='auto' my='5' p='5' bg='orange.200'>
            <Heading size='xl'>
                Donate Form
            </Heading>
            <Text py='5'>
                What if someone wanted to choose how much to donate? We could create a simple form.
            </Text>
        </Box>
    );
}
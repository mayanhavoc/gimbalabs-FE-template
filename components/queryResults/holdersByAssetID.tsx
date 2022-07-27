import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Heading, Text } from "@chakra-ui/react"

export default function HoldersByAssetID() {

    return (
        <Box m='5' p='5' bg='blue.200'>
            <Heading size='lg'>
                Another way is to query the policy id
            </Heading>
            <Text p='2'>
                To do: show query results here.
            </Text>
        </Box>
    );
}

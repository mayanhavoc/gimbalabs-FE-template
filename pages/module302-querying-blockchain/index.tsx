import { Box, Heading, Text, Grid, GridItem, Link as ChakraLink } from '@chakra-ui/react'
import type { NextPage } from "next";
import Head from 'next/head'
import Link from 'next/link'

const Module302: NextPage = () => {
    return (
        <Box>
            <Heading>Module 302: Querying the Blockchain</Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap='3' pt='5'>
                <GridItem bg='blue.100' _hover={{ bg: 'blue.800', color: 'white' }}>
                    <Text p='3'>
                        <Link href="/templates/ssg">Some Ugly Query Results</Link>
                    </Text>
                </GridItem>
                <GridItem bg='blue.100' _hover={{ bg: 'blue.800', color: 'white' }}>
                    <Text p='3'>
                        <Link href="/templates/isr">Mastery Level 1</Link>
                    </Text>
                </GridItem>
                <GridItem bg='blue.100' _hover={{ bg: 'blue.800', color: 'white' }}>
                    <Text p='3'>
                        <Link href="/templates/ssr">Mastery Level 2</Link>
                    </Text>
                </GridItem>
                <GridItem bg='blue.100' _hover={{ bg: 'blue.800', color: 'white' }}>
                    <Text p='3'>
                        <Link href="/templates/csr">Mastery Level 3</Link>
                    </Text>
                </GridItem>
                <GridItem bg='orange.100' colSpan={2}>
                    <Text p='3'>
                        Mastery Level 4: Your task is to...
                    </Text>
                </GridItem>
            </Grid>
        </Box>

    )
}

export default Module302
// Imports:
// You may not use all of these, and you may need to add a few!
import {
    Box, Heading, Text, Grid, GridItem
} from "@chakra-ui/react"
import TransactionIronicMango from "./transactionIronicMango";
import TransactionSourabh from "./transactionSourabh";
import TransactionTemplate from "./transactionTemplate";



export default function StudentContributions() {

    return (
        <Box my='5'>
            <Heading>
                PPBL Student Contributions
            </Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap='5' mt='10'>
                <GridItem>
                    <TransactionTemplate />
                </GridItem>
                <GridItem>
                    <TransactionSourabh />
                </GridItem>
                <GridItem>
                    <TransactionIronicMango />
                </GridItem>
            </Grid>
        </Box>
    );
}
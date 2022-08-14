import { useEffect, useState } from "react";
import {
    Box, Heading, Text, Input, FormControl, Button, Center, Spinner
} from "@chakra-ui/react"
import { useFormik } from "formik";
import useWallet from "../../contexts/wallet";
import { TransactionService } from '@martifylabs/mesh'


export default function DonateForm() {
    const donationAddress = "addr_test1qz2h42hnke3hf8n05m2hzdaamup6edfqvvs2snqhmufv0eryqhtfq6cfwktmrdw79n2smpdd8n244z8x9f3267g8cz6s59993r"

    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);


    const formik = useFormik({
        initialValues: {
            lovelace: '',
        },
        onSubmit: values => {
            alert("Success!");
        },
    });

    // Ask Mesh team about Error reporting
    const handleDonate = async () => {
        if (walletConnected) {
            setLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("For now, this dapp only works on Cardano Testnet")
            }
            const tx = new TransactionService({initiator: wallet}).sendLovelace(
                donationAddress,
                formik.values.lovelace
            );
            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);
            setSuccessfulTxHash(txHash)
            setLoading(false)
        }
        else {
            alert("please connect a wallet")
        }
    }

    return (
        <Box my='5' p='5' bg='orange.200'>
            <Heading size='xl'>
                Donate Form
            </Heading>
            <Text py='1'>
                This form will send any number of available lovelace specified to: 
            </Text>
            <Text pb='2' fontSize="xs">
                {donationAddress}
            </Text>
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Box mt='2' p='5' bg='orange.100'>
                    <FormControl my='3'>
                        <Input mb='3' bg='white' id="lovelace" name="lovelace" onChange={formik.handleChange} value={formik.values.lovelace} />
                        <Button colorScheme='purple' onClick={handleDonate}>Send this much lovelace</Button>
                    </FormControl>
                    <Box mt='2' p='2' bg='blue.200'>
                        <Heading size='sm' py='1'>Status</Heading>
                        {successfulTxHash ? (
                            <Text>Successful tx: {successfulTxHash}</Text>
                        ) : (
                            <Text>Ready to test a transaction!</Text>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
import { useState } from "react";
import {
    Box, Heading, Text, Input, FormControl, Button, Center, Spinner
} from "@chakra-ui/react"
import { useFormik } from "formik";
import useWallet from "../../contexts/wallet";
import { Transaction } from '@martifylabs/mesh'
import type { UTxO } from "@martifylabs/mesh";

export default function QuickSendToken() {
    // Pre-Production
    const assetId = "748ee66265a1853c6f068f86622e36b0dda8edfa69c689a7dd232c605050424c53756d6d657232303232"

    // Legacy Testnet
    // const assetId = "1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f95050424c53756d6d657232303232"

    const { walletConnected, wallet } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            address: '',
        },
        onSubmit: values => {
            alert("Success!");
        },
    });

    // Ask Mesh team about Error reporting
    const handleSend = async () => {
        if (walletConnected) {
            setLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("For now, this dapp only works on Cardano Testnet")
            } else {
                try {
                    const tx = new Transaction({ initiator: wallet })
                        .sendValue(
                            formik.values.address,
                            {
                                output: {
                                    amount: [
                                        {
                                            unit: "lovelace",
                                            quantity: "5000000"
                                        },
                                        {
                                            unit: assetId,
                                            quantity: "1",
                                        }
                                    ]
                                }
                            },
                        );
                    const unsignedTx = await tx.build();
                    const signedTx = await wallet.signTx(unsignedTx);
                    const txHash = await wallet.submitTx(signedTx);
                    setSuccessfulTxHash(txHash)
                } catch (error: any) {
                    if (error.info) {
                        alert(error.info)
                    }
                    else {
                        alert(error)
                        console.log(error)
                    }
                }
            }
            setLoading(false)
        }
        else {
            alert("please connect a wallet")
        }
    }

    return (
        <Box my='5' p='5' bg='orange.200'>
            <Heading size='xl'>
                Quickly Send a PPBLSummer2022 Token
            </Heading>
            <Text py='2'>
                This form will send one PPBLSummer2022 token to the address specified.
            </Text>
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Box mt='2' p='5' bg='orange.100'>
                    <FormControl>
                        <Input my='3' bg='white' id="address" name="address" onChange={formik.handleChange} value={formik.values.address} />
                        <Button colorScheme='purple' onClick={handleSend}>Send to Address</Button>
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
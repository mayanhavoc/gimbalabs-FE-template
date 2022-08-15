import { useEffect, useState } from "react";
import {
    Box, Heading, Text, Button, Center, Spinner
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";

import { TransactionService } from '@martifylabs/mesh'


export default function DonateButton() {
    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDonate = async () => {
        if (walletConnected) {
            setLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("this dapp only works on Cardano Testnet")
            }
            const tx = new TransactionService({initiator: wallet}).sendLovelace(
                "addr_test1qz2h42hnke3hf8n05m2hzdaamup6edfqvvs2snqhmufv0eryqhtfq6cfwktmrdw79n2smpdd8n244z8x9f3267g8cz6s59993r",
                "5000000"
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
                Donate Button
            </Heading>
            <Text py='3'>
                One of the simplest transactions we can create is a "donate" button. Anyone who clicks it will send 5 tAda to a hard-coded address.
            </Text>
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <>
                    <Button onClick={handleDonate} colorScheme='green'>Is this thing on?</Button>
                    <Text pt='3'>
                        You'll know the transaction was successful if you see a TxHash here: {successfulTxHash}
                    </Text>
                    <Text pt='3'>
                        Go find your transaction on <a href='https://testnet.cardanoscan.io/'>https://testnet.cardanoscan.io/. It may take a few moments to show up. Why do you think it is possible to see a TxHash before it is visible a blockchain explorer?</a>
                    </Text>
                </>
            )}
        </Box>
    );
}
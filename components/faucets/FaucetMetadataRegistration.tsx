import { useEffect, useState } from "react";
import {
    Box, Button, Center, Heading, Spinner, Text,
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";
import { TransactionService } from '@martifylabs/mesh'

export default function FaucetMetadataRegistration(props: any) {

    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    const handleLockTokens = async () => {
        if (walletConnected) {
            setLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("For now, this dapp only works on Cardano Testnet")
            }
            const tx = new TransactionService({initiator: wallet}).sendLovelace(
                connectedAddress,
                "1000000"
            )
            .setMetadata(
                1618033,
                JSON.stringify({"Hello": "World"})
            )
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
        <Box my='5' p='5' bg='teal.200'>
            <Heading size='xl'>
                Register Your Faucet with Metadata TODO: FORM
            </Heading>
            <Text py='2'>
                You will send 1 ada to yourself and pay a tx fee.
            </Text>
            <Button colorScheme='purple' onClick={handleLockTokens}>Register</Button>
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Box>
                    Some result
                </Box>
            )}
        </Box>
    );
}
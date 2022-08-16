import { useEffect, useState } from "react";
import {
    Box, Button, Center, Heading, Spinner, Text,
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";
import { TransactionService } from '@martifylabs/mesh'
import { scriptInteger } from "../../cardano/plutus/faucet-integer";
import { scriptUnit } from "../../cardano/plutus/faucet-unit";

export default function FaucetLockingComponent(props: any) {

    const contractAddress = scriptInteger.address;
    // scriptInteger:
    const datum = 1618;
    // scriptUnit:
    // const datum = []

    const assets = [
        {
            unit: '6c57132fde399c9ea6e462c4214d164984891087922b6fa2472b175b7470626c5465737447696d62616c',
            quantity: '10000'
        }
    ]

    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    const handleLockTokens = async () => {
        if (walletConnected) {
            setLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("For now, this dapp only works on Cardano Testnet")
            } else {
                try {
                    const tx = new TransactionService({ initiator: wallet })
                        .sendAssets(
                            contractAddress,
                            assets,
                            { datum: datum }
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
        <Box my='5' p='5' bg='teal.200'>
            <Heading size='xl'>
                Lock Tokens in Faucet
            </Heading>
            <Text py='2'>
                Deposit at Contract: {contractAddress}
            </Text>
            <Button colorScheme='purple' onClick={handleLockTokens}>Lock those Tokens!</Button>
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Box>
                    Some result: {successfulTxHash}
                </Box>
            )}
        </Box>
    );
}
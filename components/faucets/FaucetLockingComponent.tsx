import { useEffect, useState } from "react";
import {
    Box, Button, Center, Heading, Spinner, Text,
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";
import { TransactionService } from '@martifylabs/mesh'
import { tgimbal } from "../../cardano/plutus/pre-prod-faucet-tgimbal.js";

export default function FaucetLockingComponent(props: any) {

    const contractAddress = tgimbal.address;
    const faucetAsset = '748ee66265a1853c6f068f86622e36b0dda8edfa69c689a7dd232c605050424c53756d6d657232303232'
    const datum = 1618;

    const lockAssets = [
        {
            unit: faucetAsset,
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
                            lockAssets,
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
        <Box my='5' p='5' bg='purple.900' color='white'>
            <Heading size='xl'>
                Lock Tokens in Faucet
            </Heading>
            <Text py='2'>
                Deposit at Contract: {contractAddress}
            </Text>
            <Button my='2' colorScheme='purple' onClick={handleLockTokens}>Lock those Tokens!</Button>
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Box mt='2' p='2' bg='purple.200' color='black'>
                    {successfulTxHash ? (
                        <Text>
                            {successfulTxHash}
                        </Text>
                    ) : (
                        <Text>
                            Try it!
                        </Text>
                    )}
                </Box>
            )}
        </Box>
    );
}
import { useEffect, useState } from "react";
import {
    Box, Button, Center, Heading, Spinner, Text,
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";
import { TransactionService, BlockfrostProvider, resolveDataHash } from '@martifylabs/mesh'
import type { UTxO, Asset, Data, Action } from '@martifylabs/mesh'
// Use these type to check against 3rd party query
// Review other Types
import { scriptInteger } from "../../cardano/plutus/faucet-integer"
import { scriptUnit } from "../../cardano/plutus/faucet-unit"
import { getUtxoKoios } from "../../cardano/koios";

export default function FaucetUnlockingComponent() {

    const contractAddress = scriptInteger.address
    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    const [contractUtxos, setContractUtxos] = useState<UTxO[] | null>(null)
    const [faucetUtxo, setFaucetUtxo] = useState<UTxO | null>(null)
    const [faucetBalance, setFaucetBalance] = useState<string | null>(null)

    // Check against registered metadata for datum number and asset.unit
    const datum = 1618;
    const faucetAsset = "6c57132fde399c9ea6e462c4214d164984891087922b6fa2472b175b7470626c5465737447696d62616c"

    useEffect(() => {
        const getMyUtxos = async () => {
            const _utxo = await getUtxoKoios(contractAddress)
            setContractUtxos(_utxo)
        }
        getMyUtxos();
    }, [])

    useEffect(() => {
        if (contractUtxos) {
            const result = contractUtxos.filter(utxo => (
                utxo.output.dataHash == "2da1c63e7646ce8cc514113c66e9cefb79e482210ad1dadb51c2a17ab14cf114"
            ))
            setFaucetUtxo(result[0])
        }
    }, [contractUtxos])

    useEffect(() => {
        if (faucetUtxo) {
            const _faucetAsset = faucetUtxo.output.amount.filter(asset => asset.unit === faucetAsset)
            setFaucetBalance(_faucetAsset[0].quantity)
        }
    }, [faucetUtxo])

    // Todo: Check against registered metadata to get quantity
    const assetsToSender: Asset[] = [
        {
            unit: '6c57132fde399c9ea6e462c4214d164984891087922b6fa2472b175b7470626c5465737447696d62616c',
            quantity: '5000'
        },
        {
            unit: '1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f95050424c53756d6d657232303232',
            quantity: '1'
        }
    ]

    // Todo: this quantity will also a require a dynamic query
    const assetsToContract: Asset[] = [
        {
            unit: '6c57132fde399c9ea6e462c4214d164984891087922b6fa2472b175b7470626c5465737447696d62616c',
            quantity: '5000'
        }
    ]

    const justAnIntegerRedeemer: Action = {
        data: 101
    }

    const handleUnLockTokens = async () => {

        if (walletConnected) {
            setLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("For now, this dapp only works on Cardano Testnet")
            } else {
                try {
                    console.log("Build a transaction.")
                    console.log("Connected", connectedAddress)
                    console.log("Contract", contractAddress)
                    const tx = new TransactionService({ initiator: wallet })
                        .redeemFromScript(
                            faucetUtxo,
                            scriptInteger.script,
                            {
                                datum,
                                redeemer: justAnIntegerRedeemer
                            },
                        ).sendAssets(
                            connectedAddress,
                            assetsToSender
                        ).sendAssets(
                            contractAddress,
                            assetsToContract,
                            { datum: datum }
                        );
                    console.log("so far so good!")
                    const unsignedTx = await tx.build();

                    // required-signer is taken care of by Mesh
                    // try this without PartialSigned true to see what happens.
                    const signedTx = await wallet.signTx(unsignedTx, true);
                    // error reporting?
                    const txHash = await wallet.submitTx(signedTx);
                    setSuccessfulTxHash(txHash)
                } catch (error: any) {
                    if (error.info) {
                        alert(error.info)
                        console.log(error)
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
                Unlock Tokens from Faucet
            </Heading>
            <Text py='2'>
                Result: {JSON.stringify(faucetUtxo)}
            </Text>
            <Box my='2' p='2' bg='purple.200' color='black'>
                Balance: {faucetBalance}
            </Box>
            <Text py='2'>
                Contract Address: {contractAddress}
            </Text>
            <Button my='2' colorScheme='purple' onClick={handleUnLockTokens}>Unlock those Tokens!</Button>
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


// Notes:

    // To do: Make datum match what the Contract expects!
    // Datum and redeemer are Integers, use: const datum = 1618

    // Datum is (), we can just use const datum = []
    // This would match {"constructor":0,"fields":[]}

    // So what about {"constructor":1,"fields":[]} ?
    // Redeemer is the only use case here? Think about if necessary for Datums??
    // const redeemer: Action = {
    //   alternative: 0, <-- will match "constructor" value (works for redeemer)
    //   budget: DEFAULT_REDEEMER_BUDGET,
    //   data: [] as Data,
    //   index: value.input.outputIndex,
    //   tag: 'SPEND',
    // };

    // const Update: Action = {
    //   alternative: 0, <-- will match "constructor" value (works for redeemer)
    //   budget: DEFAULT_REDEEMER_BUDGET,
    //   data: [] as Data,
    //   index: value.input.outputIndex,
    //   tag: 'SPEND',
    // };

    // const Cancel: Action = {
    //   alternative: 1, <-- will match "constructor" value (works for redeemer)
    //   budget: DEFAULT_REDEEMER_BUDGET,
    //   data: [] as Data,
    //   index: value.input.outputIndex,
    //   tag: 'SPEND',
    // };

    // const simpleRedeemer: Action = {
    //    data: 1
    //    index: 0 (for example) -- or, allow Mesh to figure it out
    // }

    // Template:
    // {
    //     input: {
    //         outputIndex: number;
    //         txHash: string;
    //     };
    //     output: {
    //         address: string;
    //         amount: Asset[];
    //         dataHash ?: string;
    //         plutusData ?: string;
    //         scriptRef ?: string;
    //     };
    // }
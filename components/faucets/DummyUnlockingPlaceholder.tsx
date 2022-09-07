import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import type { UTxO, Asset, Data, Action, Address } from '@martifylabs/mesh'

import {
    Box, Button, Center, Heading, Spinner, Text,
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";
import { Transaction, BlockfrostProvider, resolveDataHash, resolveKeyHash } from '@martifylabs/mesh'
// Use these type to check against 3rd party query
// Review other Types
import { tgimbal } from "../../cardano/plutus/pre-prod-faucet-minimal-tgimbal"

const QUERY = gql`
    query UtxosAtAddress($contractAddress: String!) {
        utxos(where : {address : { _eq : $contractAddress }}){
            txHash
            index
            value
            tokens {
                asset {
                    policyId
                    assetName
                }
                quantity
            }
        }
    }
`;

export default function DummyUnlockingPlaceholder() {

    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null)
    const [faucetBalance, setFaucetBalance] = useState<number | null>(null)
    const [tokensBackToFaucet, setTokensBackToFaucet] = useState<number>(0)
    const [txLoading, setTxLoading] = useState<boolean>(false)
    const [connectedPkh, setConnectedPkh] = useState<string>("")

    const datum = 1618;
    const datumHash = resolveDataHash(datum);
    const faucetAsset = "fb45417ab92a155da3b31a8928c873eb9fd36c62184c736f189d334c7467696d62616c";
    const faucetTokenName = "tgimbal";
    const withdrawalAmount = 250;

    let _contract_utxo: UTxO[] = []

    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            contractAddress: tgimbal.address
        }
    });

    useEffect(() => {
        if (_contract_utxo.length > 0) {
            const _faucetAsset = _contract_utxo[0].output.amount.filter(asset => asset.unit === faucetAsset)
            const _faucetBalance = parseInt(_faucetAsset[0].quantity)
            setFaucetBalance(_faucetBalance)
        }
    }, [_contract_utxo])

    useEffect(() => {
        if (faucetBalance) {
            setTokensBackToFaucet(faucetBalance - withdrawalAmount)
        }
    }, [faucetBalance])

    useEffect(() => {
        if (walletConnected) {
            const result = resolveKeyHash(connectedAddress)
            setConnectedPkh(result)
        }
    }, [walletConnected])

    // Todo: Check against registered metadata to get quantity
    const assetsToSender: Asset[] = [
        {
            unit: faucetAsset,
            quantity: withdrawalAmount.toString()
        }
    ]

    const accessTokenToSender: Asset[] = [
        {
            unit: '748ee66265a1853c6f068f86622e36b0dda8edfa69c689a7dd232c605050424c53756d6d657232303232',
            quantity: '1'
        }
    ]

    // Todo: this quantity will also a require a dynamic query
    const assetsToContract: Asset[] = [
        {
            unit: faucetAsset,
            quantity: tokensBackToFaucet.toString()
        }
    ]

    const pkhRedeemer: Action = {
        data: 101
    }

    // could this be a problem protocol parameters?

    const handleUnLockTokens = async () => {
        if (walletConnected) {
            setTxLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("For now, this dapp only works on Cardano Testnet")
            } else {
                try {
                    console.log("Build a transaction.")
                    console.log("Connected", connectedAddress)
                    console.log("Contract", tgimbal.address)
                    const tx = new Transaction({
                        initiator: wallet, parameters: {
                            epoch: 0,
                            coinsPerUTxOSize: '34482',
                            priceMem: 0.0577,
                            priceStep: 0.0000721,
                            minFeeA: 44,
                            minFeeB: 155381,
                            keyDeposit: '2000000',
                            maxTxSize: 16384,
                            maxValSize: '5000',
                            poolDeposit: '500000000',
                            maxCollateralInputs: 3,
                            maxBlockSize: 65536,
                            collateralPercent: 150,
                            maxBlockHeaderSize: 1100,
                            minPoolCost: '0',
                            maxTxExMem: '10000000',
                            maxTxExSteps: '10000000000',
                            maxBlockExMem: '50000000',
                            maxBlockExSteps: '40000000000',
                        }, era: "ALONZO"
                    })
                        .sendAssets(
                            connectedAddress,
                            assetsToSender
                        ).sendAssets(
                            connectedAddress,
                            accessTokenToSender
                        ).sendAssets(
                            tgimbal.address,
                            assetsToContract,
                            { datum }
                        ).redeemValue(
                            tgimbal.script,
                            _contract_utxo[0],
                            {
                                datum,
                                redeemer: pkhRedeemer
                            },
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
            setTxLoading(false)
        }
        else {
            alert("please connect a wallet")
        }
    }

    if (loading) return (
        <Text>{JSON.stringify(loading)}</Text>
    )

    if (error) return (
        <Text>{JSON.stringify(error)}</Text>
    )


    if (data) {
        const _asset_list: Asset[] = [
            {
                unit: "lovelace",
                quantity: data.utxos[0].value
            },
            {
                unit: faucetAsset,
                quantity: data.utxos[0].tokens[0].quantity
            }
        ]
        _contract_utxo = [{
            input: {
                outputIndex: data.utxos[0].index,
                txHash: data.utxos[0].txHash
            },
            output: {
                address: tgimbal.address,
                amount: _asset_list,
                dataHash: datumHash
            }
        }]
    }


    return (
        <Box my='5' p='5' bg='purple.900' color='white'>
            <Text py='3'>
                Withdraw {withdrawalAmount} {faucetTokenName} tokens from {tgimbal.address}
            </Text>
            <Text py='3'>Faucet Balance: {faucetBalance}</Text>
            <Text py='3'>You Get: {withdrawalAmount}</Text>
            <Text py='3'>Return to Faucet: {tokensBackToFaucet}</Text>
            <Text py='3'>Give me that PKH: {connectedPkh}</Text>
            <Text py='3'>
                {JSON.stringify(_contract_utxo)}
            </Text>

            <Button my='2' colorScheme='purple' onClick={handleUnLockTokens}>Unlock those Tokens!</Button>
            {txLoading ? (
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

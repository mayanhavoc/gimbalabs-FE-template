import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
    Box, Button, Center, Flex, Heading, Spacer, Spinner, Text,
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";
import { Transaction, resolveDataHash, resolveKeyHash } from '@martifylabs/mesh'
import type { UTxO, Asset, Data, Action } from '@martifylabs/mesh'
// Show how to use these type to check against 3rd party query
// Suggested Exploration + Doc-Writing: Review other Types
import { faucetList } from "../../cardano/plutus/ppbl-preprod-faucet-list"
import { FaucetMetadata } from "../../cardano/Types";
import { stringToHex } from "../../cardano/utils";

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

type Props = {
    faucetInstance: FaucetMetadata
}


const FaucetUnlockingComponentWithMetadata: React.FC<Props> = ({ faucetInstance }) => {

    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null)
    const [faucetBalance, setFaucetBalance] = useState<number | null>(null)
    const [tokensBackToFaucet, setTokensBackToFaucet] = useState<number>(0)
    const [txLoading, setTxLoading] = useState<boolean>(false)
    const [connectedPkh, setConnectedPkh] = useState<string>("")

    // All of the following data is pulled from on-chain metadata:
    const contractAddress = faucetInstance.contractAddress;
    const datum = parseInt(faucetInstance.datumInt);
    const datumHash = resolveDataHash(datum);
    const faucetAssetPolicyId: string = faucetInstance.policyId;
    const faucetTokenName = faucetInstance.tokenName;
    const tokenHex: string = stringToHex(faucetTokenName);
    const faucetAsset: string = faucetAssetPolicyId + tokenHex;
    const withdrawalAmount = faucetInstance.withdrawalAmount;
    const plutusScript: string = faucetList.filter(asset => asset.address == contractAddress)[0].script;

    let _contract_utxo: UTxO[] = []

    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            contractAddress: contractAddress
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
            const withdrawalNumber = parseInt(withdrawalAmount)
            setTokensBackToFaucet(faucetBalance - withdrawalNumber)
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
            unit: "lovelace",
            quantity: "2000000"
        },
        {
            unit: faucetAsset,
            quantity: withdrawalAmount.toString()
        }
    ]

    const accessTokenToSender: Asset[] = [
        {
            unit: "lovelace",
            quantity: "2000000"
        },
        {
            unit: '748ee66265a1853c6f068f86622e36b0dda8edfa69c689a7dd232c605050424c53756d6d657232303232',
            quantity: '1'
        }
    ]

    // Todo: this quantity will also a require a dynamic query
    const assetsToContract: Asset[] = [
        {
            unit: "lovelace",
            quantity: "2000000"
        },
        {
            unit: faucetAsset,
            quantity: tokensBackToFaucet.toString()
        }
    ]

    const pkhRedeemer: Partial<Action> = {
        data: [connectedPkh],
        index: 0
    }

    const handleUnLockTokens = async () => {

        if (walletConnected) {
            setTxLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 1) {
                alert("This example works with Preproduction Testnet only.")
            } else {
                try {
                    console.log("Build a transaction.")
                    console.log("Connected", connectedAddress)
                    console.log("Contract", contractAddress)
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
                        .redeemValue(
                            plutusScript,
                            _contract_utxo[0],
                            {
                                datum,
                                redeemer: pkhRedeemer
                            },
                        ).sendAssets(
                            connectedAddress,
                            assetsToSender
                        ).sendAssets(
                            connectedAddress,
                            accessTokenToSender
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

    // To Do: Change this to handle multi utxos - error does not appear. (Can you see why?)

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
                address: contractAddress,
                amount: _asset_list,
                dataHash: datumHash
            }
        }]
    }

    return (
        <Box width="50%" m='5' p='5' bg='white' color='black' border='1px' borderRadius='lg'>
            <Heading size='lg' py='2'>
                Unlock {withdrawalAmount} {faucetTokenName} tokens
            </Heading>


            {_contract_utxo.length == 1 ? (
                <Center my='3' p='2' bg='green.200' color='black'>
                    <Text fontSize='sm'>
                        This is a well-managed Contract Address, with exactly 1 UTxO
                    </Text>
                </Center>
            ) : (
                <Center my='3' p='2' bg='red.200' color='black'>
                    <Text fontSize='sm'>
                        Whoops! This Contract Address has {_contract_utxo.length} UTxOs!
                    </Text>
                </Center>
            )}
            <Text py='2'>
                Contract Address: {contractAddress}
            </Text>
            <Text py='2'>
                Datum Value: {datum}
            </Text>
            <Text py='2'>
                Datum Hash: {datumHash}
            </Text>
            <Center my='2' p='2' bg='green.200' color='black'>
                Current Faucet Balance: {faucetBalance}
            </Center>
            <Center my='2' p='2' bg='green.200' color='black'>
                This Tx will return {tokensBackToFaucet} {faucetTokenName} to the faucet.
            </Center>
            <Button my='2' colorScheme='purple' onClick={handleUnLockTokens}>Unlock {withdrawalAmount} {faucetTokenName} Tokens!</Button>
            {txLoading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Center m='2' p='2' bg='purple.200' color='black'>
                    {successfulTxHash ? (
                        <Text fontSize='sm'>
                            Withdrawal Tx Submitted! TxHash: {successfulTxHash}
                        </Text>
                    ) : (
                        <Text fontSize='sm'>
                            Press the button to build and submit an unlocking transaction.
                        </Text>
                    )}
                </Center>
            )}
        </Box>
    );
}

export default FaucetUnlockingComponentWithMetadata
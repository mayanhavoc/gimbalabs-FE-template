import {
    Box, Heading, Text, Center, Spinner
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import useWallet from '../../contexts/wallet';

import ConnectWallet from '../../components/wallet/connectWallet';
import DonateButton from '../../components/transactions/donateButton';
import DonateForm from '../../components/transactions/donateForm';
import TransactionTemplate from '../../components/transactions/transactionTemplate';
import QuickSendToken from '../../components/transactions/quickSendToken';

const TransactionsPage: NextPage = () => {
    const { connecting, walletNameConnected, connectWallet, walletConnected, wallet, connectedAddress } = useWallet();
    const [assets, setAssets] = useState({})
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAssets = async () => {
            setLoading(true);
            const _assets = await wallet.getAssets();
            setAssets(_assets);
        }

        if (walletConnected) {
            fetchAssets();
            setLoading(false);
        }
    }, [walletConnected])


    return (
        <Box>
            <Heading>
                Example Transactions
            </Heading>
            <Heading size='lg' py='3'>
                Here are some examples.
            </Heading>

            <Box p='4' bg='purple.200'>
                {(loading || connecting || connectedAddress.length === 0) ? (
                    <Center>
                        <Spinner />
                    </Center>
                ) : (
                    <Text>
                        Connected to {connectedAddress} with {walletNameConnected}.
                    </Text>
                )}
            </Box>

            <DonateButton />
            <DonateForm />
            <QuickSendToken />
            <TransactionTemplate />


        </Box>
    )
}

export default TransactionsPage

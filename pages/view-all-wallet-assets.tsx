import {
    Box, Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Mesh from "@martifylabs/mesh";

import ConnectWallet from '../components/wallet/connectWallet';

const ViewAllWalletAssets: NextPage = () => {

    const [walletConnected, setWalletConnected] = useState<null | string>(null);
    const [currentNetwork, setCurrentNetwork] = useState<"Not Connected" | "Mainnet" | "Testnet">("Not Connected")
    const [assets, setAssets] = useState<null | any>(null);

    useEffect(() => {
        const fetchAssets = async () => {
            const _assets = await Mesh.wallet.getAssets({});
            setAssets(_assets);
        }

        const fetchNetwork = async () => {
            const _network = await Mesh.wallet.getNetworkId();
            if (_network === 0) {
                setCurrentNetwork("Testnet")
            }
            else if (_network === 1) {
                setCurrentNetwork("Mainnet")
            }
        }

        if (walletConnected) {
            fetchAssets();
            fetchNetwork();
        }

    }, [walletConnected])

    return (
        <Box>
            <Heading>
                View a list of all assets in your connected wallet
            </Heading>
            <Heading py='2' size='sm'>
                On Cardano Network: {currentNetwork}
            </Heading>
            <Box m='5' p='5' bg='#435689' color='#ffffff'>
                <ConnectWallet
                    walletConnected={walletConnected}
                    setWalletConnected={setWalletConnected}
                />
                {/* TODO: Replace with an Array.map */}
                <pre>
                    <code className="language-js">{JSON.stringify(assets, null, 2)}</code>
                </pre>
            </Box>
        </Box>
    )
}

export default ViewAllWalletAssets

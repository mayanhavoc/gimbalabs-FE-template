import { useEffect, useState } from "react";
import Mesh from "@martifylabs/mesh";
import WalletButton from "../walletButton";
import Image from "next/image";

// Thank you MartifyLabs for this code!
// TODO: Get images working :)

const WALLETS = {
    nami: {
        name: "Nami",
        logo: "nami.svg",
    },
    ccvault: {
        name: "Eternl",
        logo: "eternl.webp",
    },
    gerowallet: {
        name: "Gero",
        logo: "gerowallet.svg",
    },
};

export default function ConnectWallet({ walletConnected, setWalletConnected }) {
    const [availableWallets, setAvailableWallets] = useState<string[] | null>(
        null
    );

    useEffect(() => {
        async function getWallets() {
            setAvailableWallets(await Mesh.wallet.getAvailableWallets());
        }
        getWallets();
    }, []);

    async function connectWallet(walletName: string) {
        let connected = await Mesh.wallet.enable({ walletName: walletName });
        if (connected) {
            setWalletConnected(walletName);
        }
    }

    // TODO: Get wallet logo images working again

    return (
        <>
            <h2>Connect available wallets</h2>
            {availableWallets
                ? availableWallets.length == 0
                    ? "No wallets found"
                    : availableWallets.map((walletName, i) => (
                        <WalletButton
                            key={walletName}
                            onClick={() => connectWallet(walletName)}
                        >
                            Connect with {WALLETS[walletName].name}
                        </WalletButton>
                    ))
                : ""}
        </>
    );
}
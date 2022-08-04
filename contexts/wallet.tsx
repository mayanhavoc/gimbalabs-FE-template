import React, { createContext, useState, useContext, useMemo } from 'react';
import { WalletService } from '@martifylabs/mesh';

const WalletContext = createContext({
  wallet: {} as WalletService,
  connecting: false,
  walletNameConnected: '',
  walletConnected: false,
  connectWallet: async (walletName: string) => {},
  connectedAddress: '',
});

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState<WalletService>({} as WalletService);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [walletNameConnected, setWalletNameConnected] = useState<string>('');
  const [connectedAddress, setConnectedAddress] = useState<string>('');

  const connectWallet = async (walletName: string) => {
    setConnecting(true);
    const _wallet = await WalletService.enable(walletName);
    const _address = await _wallet.getUsedAddresses();
    if (_wallet) {
      setWallet(_wallet);
      setWalletNameConnected(walletName);
      setWalletConnected(true);
      setConnectedAddress(_address[0])
    }
    setConnecting(false);
  };

  const memoedValue = useMemo(
    () => ({
      wallet,
      connecting,
      walletNameConnected,
      walletConnected,
      connectWallet,
      connectedAddress,
    }),
    [wallet, walletConnected, connecting, walletNameConnected, connectedAddress]
  );

  return (
    <WalletContext.Provider value={memoedValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default function useWallet() {
  return useContext(WalletContext);
}
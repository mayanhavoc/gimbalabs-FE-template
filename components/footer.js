import { useEffect, useState } from 'react';
import Link from 'next/link'
import { Flex, Spacer, Text } from '@chakra-ui/react'
import useWallet from '../contexts/wallet'
import ConnectWallet from './wallet/connectWallet';
import { stringify } from 'querystring';

export default function Footer() {
  const { connecting, walletNameConnected, connectWallet, walletConnected, connectedAddress } = useWallet();
  const [footerColor, setFooterColor] = useState('orange.200')

  useEffect(() => {
    if(walletConnected){
      setFooterColor('purple.200')
    }
  }, [walletConnected])

  return (
      <Flex pos="fixed" bottom="0" direction="row" w="100%" p="5" bg={footerColor}>
        <Text>Connected to: {walletNameConnected}</Text>
        <Spacer />
        {connectedAddress}
        <Spacer />
        <ConnectWallet />
      </Flex>
  )
}

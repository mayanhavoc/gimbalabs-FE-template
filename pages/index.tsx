import {
  Box, Heading,
  Button, ButtonGroup,
  Code
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Mesh from "@martifylabs/mesh";
import Head from 'next/head'
import Image from 'next/image'

import ConnectWallet from '../components/wallet/connectWallet';

const Home: NextPage = () => {

  const [walletConnected, setWalletConnected] = useState<null | string>(null);
  const [assets, setAssets] = useState<null | any>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      const _assets = await Mesh.wallet.getAssets({});
      setAssets(_assets);
    }

    if(walletConnected) {
      fetchAssets();
    }

  }, [walletConnected])

  return (
    <Box>
      <Heading>
        Hello PPBL
      </Heading>
      <Box m='5' p='5' bg='#435689' color='#ffffff'>
        <ConnectWallet
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
        />
        <pre>
          <code className="language-js">{JSON.stringify(assets, null, 2)}</code>
        </pre>
      </Box>
    </Box>
  )
}

export default Home

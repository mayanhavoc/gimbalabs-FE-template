import { 
  Box, Heading,
  Button, ButtonGroup,
  Code 
} from '@chakra-ui/react'
import { useState } from "react";
import type { NextPage } from "next";
import Mesh from "@martifylabs/mesh";
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {

  const [assets, setAssets] = useState<null | any>(null);

  async function connectWallet(walletName: string) {
    let connected = await Mesh.wallet.enable({ walletName: walletName });
    const _assets = await Mesh.wallet.getAssets({});
    setAssets(_assets);
  }

  return (
    <Box>
      <Heading>
        Hello PPBL
      </Heading>
      <Box m='5' p='5' bg='#435689' color='#ffffff'>
        <Button colorScheme='red' onClick={() => connectWallet("ccvault")}>
          Connect Wallet
        </Button>
        <pre>
          <code className="language-js">{JSON.stringify(assets, null, 2)}</code>
        </pre>
      </Box>
    </Box>
  )
}

export default Home

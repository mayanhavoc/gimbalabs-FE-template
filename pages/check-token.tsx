import {
  Box, Heading,
  Button, ButtonGroup,
  Code
} from '@chakra-ui/react'
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Mesh from "@martifylabs/mesh";
import Head from 'next/head'
import Image from 'next/image'

import ConnectWallet from '../components/wallet/connectWallet';


const CheckToken: NextPage = () => {

  const [walletConnected, setWalletConnected] = useState<null | string>(null);
  const [assets, setAssets] = useState<null | any>(null);
  const [numberPPBLTokens, setNumberPPBLTokens] = useState<number>(0)

  useEffect(() => {
    const fetchAssets = async () => {
      const _assets = await Mesh.wallet.getAssets({});
      setAssets(_assets);
    }

    if (walletConnected) {
      fetchAssets();
    }

  }, [walletConnected])

  useEffect(() => {
    if (assets) {
      let value = 0;
      const result = assets.find((elem: { policy: string; }) => elem.policy === "1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f9");
      if (result) {
        value = result.quantity
      }
      setNumberPPBLTokens(value)
    }
  }, [assets])

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
        <Heading>

          {numberPPBLTokens > 0 ? "You have the token!" : "You do not have the token."}
        </Heading>
      </Box>
    </Box>
  )
}

export default CheckToken

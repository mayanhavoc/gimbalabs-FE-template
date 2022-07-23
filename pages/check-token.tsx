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

const CheckToken: NextPage = () => {

  const [assets, setAssets] = useState<null | any>(null);
  const [numberPPBLTokens, setNumberPPBLTokens] = useState<number>(0)

  async function connectWallet(walletName: string) {
    let connected = await Mesh.wallet.enable({ walletName: walletName });
    const _assets = await Mesh.wallet.getAssets({});
    setAssets(_assets);
  }

  useEffect(() => {
    if(assets){
      let value = 0;
      const result = assets.find( (elem: { policy: string; })  => elem.policy === "1309921891e459c7e9acb338d5dae18f98d1c2f55c1852cd5cf341f9");
      if(result){
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
        <Button colorScheme='red' onClick={() => connectWallet("ccvault")}>
          Connect Wallet
        </Button>
        <Heading>
          
          {numberPPBLTokens > 0 ? "You have the token!" : "You do not have the token."}
        </Heading>
      </Box>
    </Box>
  )
}

export default CheckToken

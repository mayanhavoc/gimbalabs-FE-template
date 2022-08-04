import Link from 'next/link'
import { Flex, Spacer } from '@chakra-ui/react'

export default function Nav() {
  return (
      <Flex direction="row" w="100%" p="5" bg="gray.300">
        <Spacer />
        <Link href="/">(1) Check Connection</Link>
        <Spacer />
        <Link href="/check-token">(2) Check for PPBLSummer2022</Link>
        <Spacer />
        <Link href="/token-holders">(3) PPBLSummer2022 Token Holders</Link>
        <Spacer />
        <Link href="/metadata-example">(4) Hello Metadata!</Link>
        <Spacer />
        <Link href="/transactions">(5) First Txs</Link>
        <Spacer />
      </Flex>
  )
}
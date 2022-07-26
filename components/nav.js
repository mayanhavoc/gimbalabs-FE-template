import Link from 'next/link'
import { Flex, Spacer } from '@chakra-ui/react'

export default function Nav() {
  return (
      <Flex direction="row" w="100%" p="5" bg="gray.300">
        <Spacer />
        <Link href="/">(1) Home: Connect Wallet</Link>
        <Spacer />
        <Link href="/check-token">(2) Check for PPBL Token</Link>
        <Spacer />
        <Link href="/token-holders">(3) List of PPBL Token Holders</Link>
        <Spacer />
        <Link href="/metadata-example">(4) Example Metadata Query</Link>
        <Spacer />
      </Flex>
  )
}
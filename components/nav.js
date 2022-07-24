import Link from 'next/link'
import { Flex, Spacer } from '@chakra-ui/react'

export default function Nav() {
  return (
      <Flex direction="row" w="100%" p="5" bg="#dddddd">
        <Spacer />
        <Link href="/">Home</Link>
        <Spacer />
        <Link href="/check-token">Check for PPBL Token</Link>
        <Spacer />
        <Link href="/token-holders">List of Token Holders</Link>
        <Spacer />
        <Link href="/templates">NextJS GraphQL Templates</Link>
        <Spacer />
      </Flex>
  )
}
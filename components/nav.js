import Link from 'next/link'
import { Flex, Spacer } from '@chakra-ui/react'

export default function Nav() {
  return (
      <Flex direction="row" w="100%" p="5" bg="gray.300">
        <Spacer />
        <Link href="/">Module 202 - Start</Link>
        <Spacer />
        <Link href="/token-holders">Module 202 - BBK: Blockchain Queries</Link>
        <Spacer />
  
        <Link href="/transactions">Project 301 - Basic Transactions </Link>
        <Spacer />
        <Link href="/faucets">Project 301 - PPBL Faucet</Link>
        <Spacer />
      </Flex>
  )
}
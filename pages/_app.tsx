import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

import Nav from '../components/nav'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Nav />
        <Box w='80%' mx='auto' p='5'>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  )

}

export default MyApp

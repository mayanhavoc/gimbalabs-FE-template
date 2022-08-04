import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { WalletProvider } from '../contexts/wallet';


import Nav from '../components/nav'
import Footer from '../components/footer'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <WalletProvider>
          <Nav />
          <Box w='80%' mx='auto' p='5' mb='24'>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </WalletProvider>
      </ChakraProvider>
    </ApolloProvider>
  )

}

export default MyApp

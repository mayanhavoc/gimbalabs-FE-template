import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { WalletProvider } from '../contexts/wallet';

import '@fontsource/fira-mono'
import '@fontsource/courier-prime'
import '@fontsource/comfortaa'


import Nav from '../components/nav'
import Footer from '../components/footer'

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  fonts: {
    heading: "Courier Prime",
    body: "Comfortaa"
  },
  components: {
    Heading: {
      baseStyle: {
        color: "purple.800"
      },
      variants: {
        'my-variant': {
          size: "4xl",
          color: "red.900",
          font: "Comfortaa"
        }
      }
    },
    Link: {
      baseStyle: {
        color: "orange.700"
      }
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
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

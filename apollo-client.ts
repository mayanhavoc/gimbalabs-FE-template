import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://graphql-api-iohk-preprod.gimbalabs.io/",
    cache: new InMemoryCache(),
});

export default client;
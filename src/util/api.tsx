import { ApolloProvider } from '@apollo/react-components'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import * as React from 'react'
import { login, logout } from './auth'

const token = login()

const client = new ApolloClient({
  uri: process.env.API_URL,
  headers: {
    Authorization: token
  },
  onError: err => {
    if (
      err.graphQLErrors &&
      err.graphQLErrors[0] &&
      (err.graphQLErrors[0] as any).errorType &&
      (err.graphQLErrors[0] as any).errorType.match(/Unauthorized/)
    )
      logout()
  }
})

export const APIProvider: React.FunctionComponent = ({ children }) => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
  </ApolloProvider>
)

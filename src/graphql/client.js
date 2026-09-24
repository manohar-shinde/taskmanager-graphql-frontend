import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { getToken, removeToken } from "../auth/token";
import { ErrorLink } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const errorLink = new ErrorLink(({ error }) => {
  if (error?.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (graphQLError.extension?.code === "UNAUTHENTICATED") {
        removeToken();
        window.location.href = "/login";
        return;
      }
    }
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8080/graphql",
    connectionParams: () => {
      const token = getToken();
      return {
        authorization: token ? `Bearer ${token}` : "",
      };
    },
  }),
);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

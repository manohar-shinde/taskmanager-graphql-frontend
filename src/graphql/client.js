import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { getToken } from "../auth/token";

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

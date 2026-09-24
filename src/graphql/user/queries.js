import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUser {
    users {
      id
      name
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
    }
  }
`;

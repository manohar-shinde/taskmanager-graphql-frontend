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

export const GET_TASKS = gql`
  query GetTasks($page: Int!, $limit: Int!, $completed: Boolean) {
    tasks(page: $page, limit: $limit, completed: $completed) {
      total
      tasks {
        id
        title
        completed
        user {
          name
        }
      }
    }
  }
`;

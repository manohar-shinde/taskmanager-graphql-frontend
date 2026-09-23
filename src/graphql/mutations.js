import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($createTaskPayload: CreateTaskInput!) {
    createTask(input: $createTaskPayload) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $updateTaskInput: UpdateTaskInput!) {
    updateTask(id: $id, input: $updateTaskInput) {
      id
      title
      completed
    }
  }
`;

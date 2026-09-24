import { gql } from "@apollo/client";
import { TASK_FIELDS } from "./fragments";
export const CREATE_TASK = gql`
  mutation CreateTask($createTaskPayload: CreateTaskInput!) {
    createTask(input: $createTaskPayload) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $updateTaskInput: UpdateTaskInput!) {
    updateTask(id: $id, input: $updateTaskInput) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(id: $taskId) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;

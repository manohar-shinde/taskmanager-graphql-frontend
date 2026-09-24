import { gql } from "@apollo/client";
import { TASK_FIELDS } from "./fragments";

export const GET_TASKS = gql`
  query GetTasks($page: Int!, $limit: Int!, $completed: Boolean) {
    tasks(page: $page, limit: $limit, completed: $completed) {
      total
      tasks {
        ...TaskFields
        user {
          name
        }
      }
    }
  }

  ${TASK_FIELDS}
`;

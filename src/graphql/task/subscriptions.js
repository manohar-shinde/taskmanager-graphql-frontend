import { gql } from "@apollo/client";
import { TASK_FIELDS } from "./fragments";

export const TASK_CREATED_SUBSCRIPTION = gql`
  subscription TaskCreated {
    taskCreated {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;

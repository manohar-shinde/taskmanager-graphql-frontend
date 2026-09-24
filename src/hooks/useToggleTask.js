import { useMutation } from "@apollo/client/react";
import { UPDATE_TASK } from "../graphql/task/mutations";

const useToggleTask = () => {
  const [updateTask, result] = useMutation(UPDATE_TASK);

  const toggleTask = async (task) => {
    return updateTask({
      variables: {
        id: task.id,
        updateTaskInput: {
          completed: !task.completed,
        },
      },
      optimisticResponse: {
        updateTask: {
          __typename: "Task",
          id: task.id,
          title: task.title,
          completed: !task.completed,
          userId: task.userId,
        },
      },
    });
  };

  return {
    toggleTask,
    ...result,
  };
};

export default useToggleTask;

import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_TASK } from "../graphql/task/mutations";
import { GET_TASKS } from "../graphql/task/queries";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        variables: {
          createTaskPayload: {
            title: title,
          },
        },
      });
      setTitle("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter task"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Add Task"}
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

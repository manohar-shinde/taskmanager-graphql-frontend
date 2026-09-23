import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_TASK } from "../graphql/mutations";
import { GET_TASKS } from "../graphql/queries";

export default function AddTask({ taskId }) {
  const [title, setTitle] = useState("");
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(title);
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

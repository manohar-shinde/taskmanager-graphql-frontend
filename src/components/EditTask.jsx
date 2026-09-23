import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { UPDATE_TASK } from "../graphql/mutations";
import { GET_TASKS } from "../graphql/queries";

export default function EditTask({ task, onEdit }) {
  console.log(task.id);
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  });
  const handleStatus = (e) => {
    setCompleted(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask({
        variables: {
          id: task.id.toString(),
          updateTaskInput: {
            title,
            completed: completed === "true",
          },
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      onEdit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter task"
      />
      <label>
        <input
          type="radio"
          value={true}
          onChange={handleStatus}
          name="status"
        />
        Completed
      </label>
      <label>
        <input
          type="radio"
          value={false}
          onChange={handleStatus}
          name="status"
        />
        Pending
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Task"}
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

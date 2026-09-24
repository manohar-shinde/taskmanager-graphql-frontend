import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { UPDATE_TASK } from "../graphql/task/mutations";
import useToggleTask from "../hooks/useToggleTask";

export default function EditTask({ task, onEdit }) {
  console.log(task.id);
  const [title, setTitle] = useState(task.title);
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK);
  const { toggleTask, result } = useToggleTask();
  const handleStatus = async (e) => {
    await toggleTask(task);
    console.log(result);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask({
        variables: {
          id: task.id.toString(),
          updateTaskInput: {
            title,
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
          type="checkbox"
          role="switch"
          onChange={handleStatus}
          name="status"
        />
        Completed
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Task"}
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

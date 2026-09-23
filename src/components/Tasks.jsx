import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries";
import AddTask from "./AddTask";
import { useState } from "react";
import EditTask from "./EditTask";

export default function Tasks() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: {
      page: 1,
      limit: 10,
    },
  });
  if (loading) {
    return <p>Loading tasks...</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }
  const handleEdit = (task) => {
    setIsEditing(true);
    setSelectedTask(task);
  };

  return (
    <>
      <AddTask />
      {isEditing && selectedTask && (
        <EditTask
          key={selectedTask.id}
          task={selectedTask}
          onEdit={setIsEditing}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.tasks?.tasks?.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.user.name}</td>
              <td>{task.completed ? "Completed" : "Pending"}</td>
              <td>
                <button onClick={handleEdit.bind(null, task)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

import { useMutation, useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/task/queries";
import AddTask from "./AddTask";
import { useState } from "react";
import EditTask from "./EditTask";
import { DELETE_TASK } from "../graphql/task/mutations";
import { useSubscription } from "@apollo/client/react";
import { TASK_CREATED_SUBSCRIPTION } from "../graphql/task/subscriptions";

export default function Tasks() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState(undefined);
  const [page, setPage] = useState(1);

  const {
    data: sData,
    loading: sLoad,
    error: sErr,
  } = useSubscription(TASK_CREATED_SUBSCRIPTION, {
    onData: ({ data, client }) => {
      const newTask = data.data?.taskCreated;

      if (!newTask) return;

      client.cache.modify({
        fields: {
          tasks(existingTaskPage) {
            if (!existingTaskPage) return existingTaskPage;

            return {
              ...existingTaskPage,
              tasks: [newTask, ...existingTaskPage.tasks],
              total: existingTaskPage.total + 1,
            };
          },
        },
      });
    },
  });

  const [deletedTask, { loading: load, error: err }] = useMutation(
    DELETE_TASK,
    {
      update(cache, { data }) {
        const deletedTask = data?.deleteTask;
        if (!deletedTask) {
          return;
        }
        const deletedTaskId = cache.identify(deletedTask);

        cache.modify({
          fields: {
            tasks(existingTaskPage) {
              return {
                ...existingTaskPage,
                tasks: existingTaskPage.tasks.filter(
                  (taskRef) => taskRef.__ref !== deletedTaskId,
                ),
                total: existingTaskPage.total - 1,
              };
            },
          },
        });
        cache.evict({
          id: deletedTaskId,
        });

        cache.gc();
      },
    },
  );
  const limit = 10;
  const variables = {
    page,
    limit,
  };
  if (status === "Completed") {
    variables.completed = true;
  } else if (status === "Pending") {
    variables.completed = false;
  }
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables,
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

  const handleDelete = async (task) => {
    try {
      const res = await deletedTask({
        variables: {
          taskId: task.id,
        },
      });
    } catch (e) {
      console.log("Delete error", e);
    }
  };
  const total = data?.tasks.total ?? 0;
  const totalPages = Math.ceil(total / limit);
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
      {err && <p>{err.message}</p>}
      <div>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
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
                <button onClick={handleDelete.bind(null, task)}>
                  {load ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

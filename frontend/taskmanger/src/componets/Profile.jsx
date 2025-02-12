import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { isLogin, authUser, logout } = useContext(AuthContext);
  const [allTask, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch all tasks
  const alltaskhandle = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/todo/AllTask`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setTask(response.data.alltodos);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not logged in or signed up. Please try again.");
      } else {
        toast.error("Error fetching tasks. Please try again.");
      }
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  // Delete task
  const handleDelete = async (taskId) => {
    setActionLoading(taskId);
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/DeleteTodo/${taskId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setTask(allTask.filter((task) => task.id !== taskId));
        toast.success("Task deleted successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not logged in or signed up. Please try again.");
      } else {
        toast.error("Error deleting task. Please try again.");
      }
    }
    setActionLoading(null);
  };

  // Complete task
  const handleComplete = async (taskId) => {
    setActionLoading(taskId);
    try {
      const response = await axios.get(
        `http://localhost:3000/todo/task-complete/${taskId}`,
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setTask(
          allTask.map((task) =>
            task.id === taskId ? { ...task, done: true } : task
          )
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not logged in or signed up. Please try again.");
      } else {
        toast.error("Error completing task. Please try again.");
      }
    }
    setActionLoading(null);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    alltaskhandle();
  }, []);

  // If user is not logged in
  if (!isLogin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="font-bold text-3xl mb-4 text-gray-800">
          User not logged in
        </p>
        <Link to="/login">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen flex flex-col">
      <div className="mb-6 flex gap-4 justify-center">
        <button
          type="button"
          onClick={alltaskhandle}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "All Tasks"}
        </button>
        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          <Link to="/newtask">New Task</Link>
        </button>
        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          <Link to="/Progress">Progress</Link>
        </button>
      </div>

      <div className="task-list mt-8 max-h-[500px] overflow-y-auto border rounded-lg shadow-md p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : Array.isArray(allTask) && allTask.length > 0 ? (
          <ul>
            {allTask.map((task) => (
              <li
                key={task.id}
                className="task-item flex justify-between items-center mb-4 p-4 rounded-lg shadow border border-gray-200 hover:bg-gray-100"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-xl">{task.task}</span>
                  <span className="text-sm text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <div
                    className={`flex items-center justify-center text-sm font-semibold p-2 rounded-full ${
                      task.done
                        ? "bg-green-200 text-green-600"
                        : "bg-yellow-200 text-yellow-600"
                    }`}
                  >
                    {task.done ? "Completed" : "Pending"}
                  </div>

                  {!task.done && (
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm"
                      disabled={actionLoading === task.id}
                    >
                      {actionLoading === task.id
                        ? "Processing..."
                        : "Mark as Completed"}
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm"
                    disabled={actionLoading === task.id}
                  >
                    {actionLoading === task.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tasks available</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Profile;

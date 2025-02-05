import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Newtask = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/todo/new",
        { task: data.task },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/profile");
        alert("Task created successfully!");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task, please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white  rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Enter a new task"
            className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("task", {
              required: "Task description is required",
            })}
          />
        </div>
        {errors.task && (
          <p className="text-red-500 text-sm">{errors.task.message}</p>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newtask;

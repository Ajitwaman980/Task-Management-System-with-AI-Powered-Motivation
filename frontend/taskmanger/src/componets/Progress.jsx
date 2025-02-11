import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL_API = process.env.BASE_URL_API;
const Progress = () => {
  const [points, setPoints] = useState(null);

  async function fetchProgress() {
    try {
      const response = await axios.get(
        `http://localhost:3000/todo/check/score`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setPoints(response.data.totalPoint._sum.point || 0);
        toast.success(response.data.motivationalmess);
      }
    } catch (err) {
      console.error("Error fetching progress:", err);
      toast.error("Failed to fetch progress. Please try again.");
    }
  }

  return (
    <div className="p-6 text-center">
      <button
        onClick={fetchProgress}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md"
      >
        Check Progress
      </button>

      {points !== null && (
        <h2 className="mt-4 text-4xl font-bold">Total Points: {points}</h2>
      )}

      <ToastContainer className="w-72" position="top-center" autoClose={3000} />
    </div>
  );
};

export default Progress;

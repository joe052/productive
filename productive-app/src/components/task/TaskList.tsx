"use client";

import { useState, useEffect } from "react";
import React from "react";
import NewTaskButton from "../ui/AddTaskButton";
import TaskCard from "./TaskCard";
import TaskLander from "./TaskLander";
import { Task } from "@/lib/interfaces";
import { taskApi } from "@/lib/services/api";

// Define the stagger constant
const STAGGER_MS = 50;

/** TASKLIST PROPS */
interface TaskListProps {
  setOpen: (value: boolean) => void; // receive setOpen from parent
}

/** COMPONENT */
const TaskList: React.FC<TaskListProps> = ({ setOpen }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /** FETCH TASKS */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskApi.get("/tasks");
        if (response.data) {
          setTasks(response.data);
          setTimeout(() => setRevealed(true), 50);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError(
          "Unable to load your tasks at the moment. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  /** UPDATE TASK */
  const handleUpdateTask = async (_id: string, updatedTask: Partial<Task>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await taskApi.patch(`/tasks/${_id}`, updatedTask);
      if (response.data) {
        setTasks((prev) =>
          prev.map((task) => (task._id === _id ? response.data : task))
        );
        setTimeout(() => setRevealed(true), 50);
      }
    } catch (err) {
      console.error("Failed to update task:", err);
      setError("Unable to update the task at the moment. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  /** DELETE TASK */
  const handleDeleteTask = async (_id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await taskApi.delete(`/tasks/${_id}`);
      setTasks((prev) => prev.filter((task) => task._id !== _id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Unable to delete the task at the moment. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  /** TEMPLATE */
  return (
    <div>
      {/* HEADER */}
      <div className="shadow-md rounded-lg p-4 md:p-5 mx-auto mt-5 mb-5 max-w-[800px] bg-white sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-800 mr-2">My Tasks</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              {isLoading ? "..." : `${tasks.length} active`}
            </span>
          </div>
          <div>
            <NewTaskButton onClick={() => setOpen(true)} />
          </div>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="p-4 space-y-4 max-w-[800px] mx-auto">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-500 text-sm animate-pulse">Fetching tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <TaskLander />
        ) : (
          tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              reveal={revealed}
              animateDelay={Math.min(index, 8) * STAGGER_MS}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

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
  /** VARIABLES */
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // <-- ADDED

  /** Function to get tasks */
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

        // Error Message
        setError(
          "Unable to load your tasks at the moment. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  /** TEMPLATE */
  return (
    <div>
      <div className="shadow-md  rounded-lg p-4 md:p-5 mx-auto mt-5 mb-5 max-w-[800px] bg-white sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-800 mr-2">
              My Tasks
            </span>

            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              {isLoading ? "..." : `${tasks.length} active`}
            </span>
          </div>

          <div>
            {!isLoading && tasks.length > 0 && (
              <div className="task-actions">
                <NewTaskButton onClick={() => setOpen(true)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING BLOCK */}
      <div className="p-4 space-y-4 max-w-[800px] mx-auto">

        {/*ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        {/* 1. LOADING UI */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-500 text-sm animate-pulse">
              Fetching tasks...
            </p>
          </div>
        ) : !error && tasks.length === 0 ? ( //prevent empty state if error occurs
          <div>
            <TaskLander />
          </div>
        ) : (
          tasks?.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={() => {}}
              onDelete={() => {}}
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

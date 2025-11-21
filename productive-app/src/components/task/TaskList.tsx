"use client";

import { useState, useEffect } from "react";
import React from "react";
import NewTaskButton from "../ui/AddTaskButton";
import TaskCard from "./TaskCard";
import TaskLander from "./TaskLander";
import { Task } from "@/lib/interfaces";

/** DUMMY TASKS */
const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    title: "Go Shopping",
    description: "Shop at Clean Shelf.",
    date: "2025-11-20",
    priority: "High",
  },
  {
    id: 2,
    title: "Make a Study Timetable",
    description: "",
    date: "2025-11-22",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Read New Blog Post",
    description: "React state management article.",
    date: "2025-11-23",
    priority: "Low",
  },
  {
    id: 4,
    title: "Go Shopping",
    description: "Shop at Clean Shelf.",
    date: "2025-11-20",
    priority: "High",
  },
  {
    id: 5,
    title: "Make a Study Timetable",
    description: "",
    date: "2025-11-22",
    priority: "Medium",
  },
  {
    id: 6,
    title: "Read New Blog Post",
    description: "React state management article.",
    date: "2025-11-23",
    priority: "Low",
  },
  {
    id: 7,
    title: "Go Shopping",
    description: "Shop at Clean Shelf.",
    date: "2025-11-20",
    priority: "High",
  },
  {
    id: 8,
    title: "Make a Study Timetable",
    description: "",
    date: "2025-11-22",
    priority: "Medium",
  },
  {
    id: 9,
    title: "Read New Blog Post",
    description: "React state management article.",
    date: "2025-11-23",
    priority: "Low",
  },
];

const STAGGER_MS = 80; // delay between items in ms

/**COMPONENT */
const TaskList: React.FC = () => {
  /**VARIABLES */
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [revealed, setRevealed] = useState<boolean>(false);

  /**FUNCTIONS */
  /**Function to get tasks */
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(DUMMY_TASKS);
      setIsLoading(false); // Stop loading after data is set

      // tiny tick so TaskCard internals can pick up initial styles before transitioning
      setTimeout(() => {
        setRevealed(true);
      }, 20);
    }, 1000);

    /**Cleanup timer if component unmounts */
    return () => clearTimeout(timer);
  }, []);

  /**Function to update a task */
  const updateTask = (id: number, updated: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  /**Function to delete a task */
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  /**TEMPLATE */
  return (
    <div>
      <div className="shadow-md rounded-lg p-4 md:p-5 mx-auto mt-5 mb-5 max-w-[800px] bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-800 mr-2">
              My Tasks
            </span>

            {/* LOADING STATE */}
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              {/* Show '...' while loading, otherwise show count */}
              {isLoading ? "..." : `${tasks.length} active`}
            </span>
          </div>

          {/* LOADING STATE CONDITIONAL RENDER */}
          <div>
            {!isLoading && tasks.length > 0 && (
              <div className="task-actions">
                <NewTaskButton />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING BLOCK */}
      <div className="p-4 space-y-4 max-w-[800px] mx-auto">
        {/* 1. LOADING STATE (Spinner) */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 text-sm animate-pulse">
              Fetching tasks...
            </p>
          </div>
        ) : tasks.length === 0 /* 2. EMPTY STATE */ ? (
          <div>
            <TaskLander />
          </div>
        ) : (
          /**TASK LIST HERE */
          tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              reveal={revealed}
              animateDelay={index * STAGGER_MS}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

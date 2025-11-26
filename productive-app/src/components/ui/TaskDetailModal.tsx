
"use client";

import React from "react";
import { Task } from "@/lib/interfaces";
import { X } from "lucide-react";

interface TaskDetailModalProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  open,
  onClose,
}) => {
  if (!open) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const priorityColorClass =
    task.priority === "high"
      ? "bg-orange-500"
      : task.priority === "medium"
      ? "bg-green-500"
      : "bg-gray-700";

  return (
    <div 
      className="fixed inset-0  bg-opacity-50 flex   items-center shadow-md  bg-black/40  justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg border-green-500 shadow-xl w-[800px] h-[600px] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-lg text-gray-600 whitespace-pre-line">
            {task.description || "No description provided."}
          </p>

          <div className="mt-6 space-y-3 text-md">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Scheduled:</span>
              <span className="font-medium">{formatDate(task.scheduledAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">Priority:</span>
              <span className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-full ${priorityColorClass}`}></span>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-green-200 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
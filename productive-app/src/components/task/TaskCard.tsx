"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Calendar, CheckCircle, Pencil, Trash2 } from "lucide-react";
import { Task } from "@/lib/interfaces";

interface TaskCardProps {
  task: Task;
  onUpdate: (_id: string, updatedTask: Partial<Task>) => void;
  onDelete: (_id: string) => void;
  onClick?: () => void;
  reveal?: boolean;
  animateDelay?: number;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onUpdate,
  onDelete,
  onClick,
  reveal = false,
  animateDelay = 0,
}) => {
  const { _id, title, description, scheduledAt, priority } = task;

  const priorityColorClass =
    priority === "high"
      ? "bg-orange-500"
      : priority === "medium"
      ? "bg-green-500"
      : "bg-gray-700";

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);
  const [editDate, setEditDate] = useState(scheduledAt);

  const onEdit = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setEditDate(scheduledAt);
    setIsEditing(true);
  };

  const closeEdit = () => setIsEditing(false);

  const handleSave = () => {
    onUpdate(_id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      scheduledAt: editDate,
    });
    closeEdit();
  };

  const handleDelete = () => {
    onDelete(_id);
  };

  const handleMarkDone = () => {
    alert(`Task "${title}" marked as done! (ID: ${_id})`);
  };

  useEffect(() => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setEditDate(scheduledAt);
  }, [title, description, priority, scheduledAt]);

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  const animStyle: React.CSSProperties = {
    transitionProperty: "opacity, margin-top",
    transitionDuration: "240ms",
    transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
    transitionDelay: `${animateDelay}ms`,
    opacity: reveal ? 1 : 0,
    marginTop: reveal ? 0 : 12,
  };

  const truncate = (str: string, words = 5) =>
    str?.trim().split(/\s+/).length > words
      ? str.trim().split(/\s+/).slice(0, words).join(" ") + "..."
      : str || "";

  return (
    <>
      <div className="w-full flex justify-center my-2 relative">
        <div
          className="w-full max-w-[800px] bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex justify-between items-start hover:shadow-md transition-all min-h-0"
          aria-labelledby={`task-${_id}-title`}
        >
          {/* LEFT: Title + Description (clickable for modal) */}
          <div
            className="flex flex-col flex-1 cursor-pointer"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick?.()}
          >
            <div style={animStyle}>
              <h3
                id={`task-${_id}-title`}
                className="text-lg font-semibold text-gray-900"
              >
                {truncate(title)}
              </h3>
              <p className="text-gray-500 mt-1">
                {truncate(description, 8)}
              </p>

              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(scheduledAt).toLocaleDateString()}
                </span>

                <span className={`flex items-center gap-1`}>
                  <div
                    className={`w-3 h-3 rounded-full ${priorityColorClass}`}
                  ></div>
                  {priority} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Mark Done Button - Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMarkDone();
            }}
            className="absolute top-6 right-6 flex items-center  gap-1 bg-[#FCFCFC] text-[#2DC887] outline-none text-sm px-3 py-1 rounded-md hover:border-2 shadow-sm transition-all"
            aria-label="Mark task as done"
          >
            Mark Done <CheckCircle className="w-4 h-4" />
          </button>

          {/* Edit and Delete Buttons - Bottom Right */}
          <div className="flex items-center gap-8 mt-4 self-end md:self-auto md:absolute md:bottom-4 md:right-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-gray-500 hover:text-red-600 transition"
              aria-label="Delete task"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="text-gray-500 hover:text-[#2DC887] transition"
              aria-label="Edit task"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && portalTarget
        ? ReactDOM.createPortal(
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50"
              role="dialog"
              aria-modal="true"
              onClick={closeEdit}
            >
              <div className="w-full max-w-xl rounded-xl shadow-lg p-6 bg-white relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">
                  <span className="text-black">Edit </span>
                  <span className="text-green-500">Task </span>
                </h3>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  autoFocus
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date
                </label>
           <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={editDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setEditDate(e.target.value)}
          />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded mb-6"
                  value={editPriority}
                  onChange={(e) =>
                    setEditPriority(e.target.value as "high" | "medium" | "low")
                  }
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-400 text-white font-bold text-sm px-4 py-2 rounded-md shadow-md hover:bg-[#64748B] hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={closeEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#2DC887] text-white font-bold text-sm px-4 py-2 rounded-md shadow-md hover:bg-[#26A671] hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>,
            portalTarget
          )
        : null}
    </>
  );
};

export default TaskCard;
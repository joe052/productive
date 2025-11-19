"use client";

import React, { useState } from "react";
import { Calendar, MoreVertical, Pencil } from "lucide-react";

/** TYPES */
interface TaskCardProps {
  title?: string;
  description?: string;
  date?: string;
  priority?: "High" | "Medium" | "Low";
}

/** COMPONENT */
const TaskCard: React.FC<TaskCardProps> = ({
  title = "Title of your task",
  description = "Description of your task!",
  date = "Day, month, yy",
  priority = "High",
}) => {
  /** VARIABLES */
  const priorityColor =
    priority === "High"
      ? "bg-red-500 text-red-600"
      : priority === "Medium"
      ? "bg-yellow-500 text-yellow-600"
      : "bg-green-500 text-green-600";

  /** STATE */
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  /** FUNCTIONS */
  const onEdit = () => setIsEditing(true);
  const onMenu = () => setShowMenu((prev) => !prev);
  const closeEdit = () => setIsEditing(false);
  const closeMenu = () => setShowMenu(false);

  /** TEMPLATE */
  return (
    <div className="w-full flex justify-center my-2 relative">
      <div className="w-full max-w-[800px] bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex justify-between items-start hover:shadow-md transition-all min-h-[0px]">
        {/* LEFT */}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-1">{description}</p>

          <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 flex-wrap">
            {/* Date */}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              {date}
            </span>

            {/* Priority */}
            <span className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${priorityColor}`}></div>
              {priority} Priority
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-start gap-4 flex-shrink-0 mt-4 md:mt-0 relative">
          <button onClick={onEdit}>
            <Pencil className="w-5 h-5 text-yellow-500" />
          </button>

          <button onClick={onMenu}>
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-8 w-32 bg-white border rounded-md shadow-lg z-10">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  alert("Delete action triggered!");
                  closeMenu();
                }}
              >
                Delete
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  alert("Mark as done!");
                  closeMenu();
                }}
              >
                Mark as Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-white  bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <input
              className="w-full p-2 border rounded mb-4"
              defaultValue={title}
              placeholder="Title"
            />
            <textarea
              className="w-full p-2 border rounded mb-4"
              defaultValue={description}
              placeholder="Description"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeEdit}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded"
                onClick={() => {
                  alert("Task updated!");
                  closeEdit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Calendar, CheckCircle, Trash2, MoreVertical, Pencil } from "lucide-react";
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
  const [showMenu, setShowMenu] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);
  const [editDate, setEditDate] = useState(scheduledAt);

  const moreBtnRef = useRef<HTMLButtonElement | null>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number } | null>(null);

  const onEdit = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setEditDate(scheduledAt);
    setIsEditing(true);
    closeMenu();
  };

  const onMenu = () => setShowMenu((prev) => !prev);
  const closeEdit = () => setIsEditing(false);
  const closeMenu = () => setShowMenu(false);

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
    closeMenu();
  };

  const handleMarkDone = () => {
    alert(`Task "${title}" marked as done! (ID: ${_id})`);
    closeMenu();
  };

  useEffect(() => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setEditDate(scheduledAt);
  }, [title, description, priority, scheduledAt]);

  useEffect(() => {
    if (showMenu && moreBtnRef.current) {
      const rect = moreBtnRef.current.getBoundingClientRect();
      setMenuCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX - 160,
      });
    } else {
      setMenuCoords(null);
    }
  }, [showMenu]);

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  const animStyle: React.CSSProperties = {
    transitionProperty: "opacity, margin-top",
    transitionDuration: "240ms",
    transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
    transitionDelay: `${animateDelay}ms`,
    opacity: reveal ? 1 : 0,
    marginTop: reveal ? 0 : 12,
  };

  // Truncate helper
  const truncate = (str: string, words = 5) =>
    str?.trim().split(/\s+/).length > words
      ? str.trim().split(/\s+/).slice(0, words).join(" ") + "..."
      : str || "";

  return (
    <>
      <div className="w-full flex justify-center my-2 relative">
        <div
          className="w-full max-w-[800px] bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex justify-between items-start hover:shadow-md transition-all min-h-[0px] cursor-pointer"
          onClick={onClick}
          aria-labelledby={`task-${_id}-title`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onClick?.()}
        >
          <div className="flex flex-col flex-1">
            <div style={animStyle}>
              <h3 id={`task-${_id}-title`} className="text-lg font-semibold text-gray-900">
                {truncate(title)}
              </h3>
              <p className="text-gray-500 mt-1 text-sm">{truncate(description, 8)}</p>

              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(scheduledAt).toLocaleDateString()}
                </span>
                <span className={`flex items-center gap-1`}>
                  <div className={`w-3 h-3 rounded-full ${priorityColorClass}`}></div>
                  {priority} Priority
                </span>
                
                {/*UPDATED: Mark as Done Button */}
                <button 
                  onClick={handleMarkDone}
                  className="absolute top-6 right-6 flex items-center gap-1 bg-[#2DC887] text-white text-sm font-semibold px-3 py-1 rounded-md shadow-sm hover:bg-[#26A671] transition-all"
                  aria-label="Mark task as done"
                >
                  Mark Done 
                  <CheckCircle className="w-4 h-4" />
                </button>
                
              </div>
            </div>
            
            {/* NEW: Edit and Delete Buttons at the bottom right */}
            <div className="flex items-center gap-2 mt-4 self-end md:self-auto md:absolute md:bottom-4 md:right-6">
              <button 
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-600 transition"
                aria-label="Delete task"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button 
                onClick={onEdit}
                className="text-gray-500 hover:text-[#2DC887] transition"
                aria-label="Edit task"
              >
                <Pencil className="w-5 h-5 text-[#2DC887] hover:text-[#26A671] transition cursor-pointer" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Menu Portal */}
      {showMenu && portalTarget && menuCoords
        ? ReactDOM.createPortal(
            <div
              className="absolute z-50"
              style={{ top: menuCoords.top, left: menuCoords.left, width: 160 }}
              onMouseLeave={closeMenu}
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-xl">
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 rounded-t-lg"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-b-lg"
                  onClick={handleMarkDone}
                >
                  Mark as Done
                </button>
              </div>
            </div>,
            portalTarget
          )
        : null}

      {/* Edit Modal */}
      {isEditing && portalTarget
        ? ReactDOM.createPortal(
            <div
              className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
              onClick={closeEdit}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">Edit Task (ID: {_id})</h3>

                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  autoFocus
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded mb-6"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as any)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                    onClick={closeEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#2DC887] text-white font-bold text-sm px-4 py-2 rounded-md
                          shadow-md 
                          hover:bg-[#26A671] hover:shadow-lg 
                          transition-all duration-300
                          cursor-pointer"
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
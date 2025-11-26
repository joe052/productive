"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Calendar, MoreVertical, Pencil } from "lucide-react";
import { Task } from "@/lib/interfaces";

/** INTERFACES & TYPES */
interface TaskCardProps {
  task: Task;
  onUpdate: (_id: string, updatedTask: Partial<Task>) => void;
  onDelete: (_id: string) => void;
  /** optional animation controls passed from TaskList */
  reveal?: boolean;
  animateDelay?: number; // ms
}

/** COMPONENT */
const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onUpdate,
  onDelete,
  reveal = false,
  animateDelay = 0,
}) => {
  const { _id, title, description, scheduledAt, priority } = task;

  const priorityColorClass =
    priority === "high"
      ? "bg-orange-500"
      : priority === "medium"
      ? "bg-green-500 "
      : "bg-gray-700";

  /** STATE */
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);
  const [editDate, setEditDate] = useState(scheduledAt);

  /** menu portal positioning */
  const moreBtnRef = useRef<HTMLButtonElement | null>(null);
  const [menuCoords, setMenuCoords] = useState<{
    top: number;
    left: number;
  } | null>(null);

  /** HANDLERS */
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

  /** sync local fields if parent updates task */
  useEffect(() => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setEditDate(scheduledAt);
  }, [title, description, priority, scheduledAt]);

  /** compute menu position */
  useEffect(() => {
    if (showMenu && moreBtnRef.current && typeof document !== "undefined") {
      const rect = moreBtnRef.current.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 8;
      const left = rect.right + window.scrollX - 160;
      setMenuCoords({ top, left });
    } else {
      setMenuCoords(null);
    }
  }, [showMenu]);

  /** portal target */
  const portalTarget = typeof document !== "undefined" ? document.body : null;

  /** animation style */
  const animStyle: React.CSSProperties = {
    transitionProperty: "opacity, margin-top",
    transitionDuration: "240ms",
    transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
    transitionDelay: `${animateDelay}ms`,
    opacity: reveal ? 1 : 0,
    marginTop: reveal ? 0 : 12,
  };

  return (
    <>
      {/* MAIN CARD */}
      <div className="w-full flex justify-center my-2 relative">
        <div
          className="w-full max-w-[800px] bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex justify-between items-start hover:shadow-md transition-all min-h-[0px]"
          aria-labelledby={`task-${_id}-title`}
        >
          {/* LEFT */}
          <div className="flex flex-col flex-1">
            <div style={animStyle}>
              <h3
                id={`task-${_id}-title`}
                className="text-lg font-semibold text-gray-900"
              >
                {title?.trim().split(/\s+/).slice(0, 5).join(" ") +
                  (title?.trim().split(/\s+/).length > 5 ? "..." : "")}
              </h3>
              <p className="text-gray-500 mt-1">
                {description?.trim().split(/\s+/).slice(0, 5).join(" ") +
                  (description?.trim().split(/\s+/).length > 5 ? "..." : "")}
              </p>

              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 flex-wrap">
                <span
                  onClick={onEdit}
                  className="flex items-center gap-1 cursor-pointer hover:text-[#2DC887] transition"
                >
                  <Calendar className="w-4 h-4 text-gray-400" />
                  { new Date(scheduledAt).toLocaleDateString()}
                </span>

                <span
                  onClick={onEdit}
                  className={`flex items-center gap-1 cursor-pointer transition`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${priorityColorClass}`}
                  ></div>
                  {priority} Priority
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-start gap-4 flex-shrink-0 mt-4 md:mt-0 relative">
            <button onClick={onEdit}>
              <Pencil className="w-5 h-5 text-[#2DC887] hover:text-[#26A671] transition cursor-pointer" />
            </button>
            <button ref={moreBtnRef} onClick={onMenu}>
              <MoreVertical className="w-5 h-5 text-gray-500 hover:text-[#141204] transition cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* MENU PORTAL */}
      {showMenu && portalTarget && menuCoords
        ? ReactDOM.createPortal(
            <div
              className="absolute z-50"
              style={{
                position: "absolute",
                top: menuCoords.top,
                left: menuCoords.left,
                width: 160,
              }}
              onMouseLeave={closeMenu}
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-xl">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg"
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

      {/* EDIT MODAL */}
      {isEditing && portalTarget
        ? ReactDOM.createPortal(
            <div
              className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
              role="dialog"
              aria-modal="true"
              onClick={closeEdit}
            >
              <div
                className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">
                  Edit Task (ID: {_id})
                </h3>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Scheduled Date
                </label>
           <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={editDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setEditDate(e.target.value)}
          />

                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded mb-6"
                  value={editPriority}
                  onChange={(e) =>
                    setEditPriority(e.target.value as "high" | "medium" | "low")
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-400 text-white font-bold text-sm px-4 py-2 rounded-md
                               shadow-md 
                               hover:bg-[#64748B] hover:shadow-lg 
                               transition-all duration-300
                               cursor-pointer"
                    onClick={closeEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-md
                               shadow-md 
                               hover:bg-green-700 hover:shadow-lg 
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

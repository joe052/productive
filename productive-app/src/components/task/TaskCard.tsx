"use client";

import React, { useState } from "react";
import { Calendar, MoreVertical, Pencil } from "lucide-react";

/** TYPES */
interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: "High" | "Medium" | "Low";
}

interface TaskCardProps {
  task: Task;
  onUpdate: (id: number, updatedTask: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const { id, title, description, date, priority } = task;

  const priorityColorClass =
    priority === "High"
      ? "bg-red-500 text-red-600"
      : priority === "Medium"
      ? "bg-yellow-500 text-yellow-600"
      : "bg-green-500 text-green-600";

  /** STATE */
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);

  const [editDate, setEditDate] = useState(date);

  /** HANDLERS */
  const onEdit = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setEditDate(date);
    setIsEditing(true);
    closeMenu();
  };

  const onMenu = () => setShowMenu((prev) => !prev);
  const closeEdit = () => setIsEditing(false);
  const closeMenu = () => setShowMenu(false);

  const handleSave = () => {
    onUpdate(id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      date: editDate, 
    });
    closeEdit();
  };

  const handleDelete = () => {
    onDelete(id);
    closeMenu();
  };

  const handleMarkDone = () => {
    alert(`Task "${title}" marked as done! (ID: ${id})`);
    closeMenu();
  };

  return (
    <div className="w-full flex justify-center my-2 relative">
      <div className="w-full max-w-[800px] bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex justify-between items-start hover:shadow-md transition-all min-h-[0px]">
        
        {/* LEFT */}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-1">{description}</p>

          <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition">
              <Calendar className="w-4 h-4 text-gray-400" />
              {date}
            </span>

            <span className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${priorityColorClass}`}></div>
              {priority} Priority
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-start gap-4 flex-shrink-0 mt-4 md:mt-0 relative">
          <button onClick={onEdit}>
            <Pencil className="w-5 h-5 text-yellow-500 hover:text-yellow-600 transition" />
          </button>

          <button onClick={onMenu}>
            <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
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
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Edit Task (ID: {id})</h3>

            {/* Title */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            {/* Description */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            {/* DATE FIELD */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            {/* Priority */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mb-6"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as "High" | "Medium" | "Low")}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={closeEdit}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** DUMMY TASKS */
const DUMMY_TASKS: Task[] = [
  { id: 1, title: "Go Shopping", description: "Shop at Clean Shelf.", date: "2025-11-20", priority: "High" },
  { id: 2, title: "Make a Study Timetable", description: "", date: "2025-11-22", priority: "Medium" },
  { id: 3, title: "Read New Blog Post", description: "React state management article.", date: "2025-11-23", priority: "Low" },
];

const TaskListContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);

  const updateTask = (id: number, updated: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      {tasks.length === 0 ? (
        <p>No active tasks 🎉</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
        ))
      )}
    </div>
  );
};

export default TaskListContainer;

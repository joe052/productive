"use client";

import React from "react";

/**COMPONENT */
const NewTask: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */

  /**TEMPLATE */
  return <div className="w-full flex justify-center mt-50">
      <div className="w-full max-w-xl rounded-xl border border-gray-200 shadow-sm p-8 bg-rgb(252, 252, 252)">
        <h2 className="text-lg font-semibold mb-6">Create New Task</h2>

        <div className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Finish project report"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="Add any additional details..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <div className="flex gap-3">
              <input
                type="date"
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              {/* <input
                type="time"
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              /> */}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="low" />
                <span>Low</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  defaultChecked
                />
                <span>Medium</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="high" />
                <span>High</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
};

export default NewTask;

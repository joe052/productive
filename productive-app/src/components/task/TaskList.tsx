import React from 'react';
import NewTaskButton from '../ui/AddTaskButton'; 

const TaskList = () => {
  return (
    <div className="shadow-md rounded-lg p-4 md:p-5 mx-auto mt-5 mb-5 max-w-[800px] bg-white">
      
      <div className="flex justify-between items-center">
        
        <div className="flex items-center">
          
          <span className="text-lg font-bold text-gray-800 mr-2">My Tasks</span>
          
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            2 active
          </span>
        </div>
        
        <div className="task-actions">
          <NewTaskButton /> 
        </div>
      </div>
    </div>
  );
};

export default TaskList;
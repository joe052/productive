const TaskCard = ({ title, category, due, status, priority }) => {
  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-orange-100 text-orange-600",
    Low: "bg-emerald-100 text-emerald-600"
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4 flex items-center gap-4 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
        {status === 'completed' && <Check size={14} className="text-white" />}
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold text-gray-800 ${status === 'completed' ? 'line-through text-gray-400' : ''}`}>
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{due} • {category}</p>
      </div>
      {priority && (
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
      )}
    </div>
  );
};

export default TaskCard;

const mongoose = require("mongoose");

const TASKSTATUS = {
  PENDING: "pending",
  COMPLETE: "complete", 
};

const TASKPRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const TaskSchema = new mongoose.Schema(
  {
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(TASKSTATUS),
      default: TASKSTATUS.PENDING,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(TASKPRIORITY),
      default: TASKPRIORITY.MEDIUM,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };

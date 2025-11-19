const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  categoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
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
  isDone: {
    type: Boolean,
    default: false,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };

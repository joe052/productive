const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  // userId: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  // ],
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };

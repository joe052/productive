const { Task } = require("../db/models/task.model");

//READ - Get all tasks
exports.getTasks = async (req, res) => {
  try {
    /**Safety Check: Ensure the auth middleware ran */
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    /**Find tasks ONLY belonging to this user */
    const tasks = await Task.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).send(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).send({
      message: error.message || "An error occurred while fetching tasks.",
    });
  }
};

//READ (Single Task) - Get one task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).exec();
    if (!task) return res.status(404).send({ message: "Task not found." });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving task.",
    });
  }
};

//CREATE - Add a new task
exports.postTask = async (req, res) => {
  try {
    /**Destructure the fields from the request body */
    const { title, description, scheduledAt, status, priority } = req.body;

    /**Validate that the user exists (populated by middleware) */
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    /**Create the new Task object */
    const newTask = new Task({
      title: title,
      description: description,
      userId: req.user._id,
      scheduledAt: scheduledAt,
      status: status,
      priority: priority,
    });

    /**Save to Database */
    const savedTask = await newTask.save();

    res.status(201).json({ message: "Task created successfully", savedTask });
  } catch (error) {
    // This catch block handles validation errors (e.g., missing required fields)
    res.status(500).json({
      message: error.message || "Error creating task.",
      error: error,
    });
  }
};

//UPDATE (PUT) - Modify an entire task by ID
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const updates = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true, // return the updated document
      runValidators: true, // ensures updates follow schema rules
    });

    if (!updatedTask)
      return res.status(404).send({ message: "Task not found." });

    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating task.",
    });
  }
};

//PATCH - Partially update a task by ID
exports.patchTask = async (req, res) => {
  const taskId = req.params.id;
  const updates = req.body;

  try {
    const patchedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updates }, // Only update provided fields
      { new: true, runValidators: true }
    );

    if (!patchedTask)
      return res.status(404).send({ message: "Task not found." });

    res.status(200).send(patchedTask);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error partially updating task.",
    });
  }
};

//DELETE - Remove a task by ID
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask)
      return res.status(404).send({ message: "Task not found." });

    res.status(200).send({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error deleting task.",
    });
  }
};

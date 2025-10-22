const { Task } = require("../db/models/task.model");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).exec();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred!",
    });
  }
 
  //  res.status(200).send({
  //   task: "this is my task",
  // });
};

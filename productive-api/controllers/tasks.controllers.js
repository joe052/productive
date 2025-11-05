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

exports.postTask = async (req, res) => {
  const task = req.body;
  console.log(task)
  // const userId = req.user;

  try {
    let newTask = new Task({
      // userId: userId,
      title: task.title,
      description: task.description,
    });

    newTask.save().then((taskDoc) => {
      /**Return to user */
      res.send(taskDoc);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred",
    });
  }
};

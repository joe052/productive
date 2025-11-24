const express = require("express");
const app = express();
const { mongoose } = require("./db/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

/** Load the express middleware */
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**Setting up cors middleware */
const { corsOptions } = require("./configurations/corsOptions");
app.use(cors(corsOptions));
/*exposing headers */
// app.use(function (req, res, next) {
//   //below exposes the access token to headers
//   res.header("Access-control-Expose-Headers", "x-token");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept"
//   // );
//   next();
// });

/**EVERYTHING IS HERE */
app.get("/", (req, res) => {
  res.send("Your server is running");
});

/*AUTH ROUTES */
app.use("/auth", require("./routes/auth.routes"));

/*TASKS ROUTES */
app.use("/tasks", require("./routes/tasks.routes"));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App is running at port: ${PORT}`);
});

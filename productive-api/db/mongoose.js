const mongoose = require("mongoose");
const { dbConfig } = require("./dbConfig");

const uri = dbConfig.uri;

const options = {
  user: dbConfig.user,
  pass: dbConfig.pwd,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
};

mongoose.Promise = global.Promise;
mongoose
  .connect(uri, options)
  .then(() => {
    console.log("connected to MongoDB successfully :)");
  })
  .catch((e) => {
    console.log("error when attempting to connect to MongoDB");
    console.log(e);
  });

/** To prevent deprecation warnings (from MongoDB native driver) */
mongoose.set("strictQuery", false);
//mongoose.set('useCreateIndex',true);
//mongoose.set('useFindAndModify',false);

module.exports = {
  mongoose,
};

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Home", "work", "personal"],
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };

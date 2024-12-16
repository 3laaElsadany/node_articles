const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})



const articleSchema = mongoose.model("article", artSchema);
module.exports = articleSchema;
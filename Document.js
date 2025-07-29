const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  content: {
    type: String,
    default: "",   // set default empty string
    required: false // not required
  }
});

module.exports = mongoose.model("Document", DocumentSchema);
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const inputElementSchema = new Schema({
  elementType : { type: String },
  desc:         { type: String },
  fixProps: [],
  varProps: []
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const InputElement = mongoose.model("InputElement", inputElementSchema);

module.exports = InputElement;
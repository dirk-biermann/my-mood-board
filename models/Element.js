const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const elementSchema = new Schema({
  elementType:         { type: String, required: true },
  elementName:         { type: String, required: true },
  elementLabel:        { type: String, required: true },
  elementName:         { type: String, required: true },
  elementProps:        []
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
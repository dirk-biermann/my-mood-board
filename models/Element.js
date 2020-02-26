const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const elementSchema = new Schema({
  element:        { type: String, enum: ['InputText','InputNumber', 'InputColor', 'InputCheckBox', 'InputTextArea']},
  description:    { type: String },
  eltype:         { type: String },

  fixedProps:  [],
  variableProps:  [],
  status:         { type: Boolean}
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
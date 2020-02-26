const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const templateSchema = new Schema({
  name:           { type: String },
  owner:          { type: Schema.Types.ObjectId, ref: 'User'},
  description:    { type: String },
  imageUrl:       { type: String, default: ""},
  elements:       [ {} ],
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
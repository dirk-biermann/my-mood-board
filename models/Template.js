const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const templateSchema = new Schema({
  name:          { type: String, required: true },
  description:   { type: String, required: false},
  imageUrl:      { type: String, required: false, default: ""},
  imagePublicID: { type: String, required: false  },
  
  owner:         { type: Schema.Types.ObjectId, ref: 'User' },
  isPublic:      { type: Boolean, required: true },
  elements:    [ {} ]
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
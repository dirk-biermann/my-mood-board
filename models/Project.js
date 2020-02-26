const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  name:          { type: String, required: true },
  description:   { type: String, required: false },
  notes:         { type: String, required: false  },
  status:        { type: String, required: true  },
  imageUrl:      { type: String, required: true, default: "" },
  imagePublicID: { type: String, required: false  },

  owner:         { type: Schema.Types.ObjectId, ref: 'User' },
  materials:   [ { type: Schema.Types.ObjectId, ref: 'Material' } ]
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

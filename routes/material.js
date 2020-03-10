const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Material = require("../models/Material");
const Template = require("../models/Template");
const Element = require("../models/Element");

const { cloudinary } = require('../configs/cloudinary');

// --------------------------------------------------
// GET /api/materials
// --------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    // return all materials
    const allMaterials = await Material.find({owner: req.user._id});
    res.json( allMaterials );
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// GET /api/materials/usr/:id
// --------------------------------------------------
router.get("/usr/:id", async (req, res) => {
  // return 1 material with a given id
  const userId = req.params.id;

  try {
    // return all materials
    let allMaterials;
    if( req.user.role === 'admin') {
      allMaterials = await Material.find({owner: userId}).populate('owner');
      res.json( allMaterials );
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log( err );
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// GET /api/materials/:id
// --------------------------------------------------
router.get("/:id", async (req, res) => {
  // return 1 material with a given id
  const materialId = req.params.id;
  try {
    // create one material
    const material = await Material.findById(materialId);    
    if (!material) {
      res.status(404).json({ message: "material not found" });
    } else res.json(material);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// POST api/materials
// --------------------------------------------------
router.post("/create", async (req, res) => {
  const { info, data } = req.body;
  try {
    // create one material
    const result = await Material.create(data);    
    res.json( result );
  } catch (err) {
    console.log( "CRM-ERR:", err );
    res.status(500).json(err);
  }
});


// --------------------------------------------------
// DELETE /api/materials/:id
// --------------------------------------------------
router.delete("/:id", async (req, res) => {
  const materialId = req.params.id;
  try {
    // create one material
    const result = await Material.findByIdAndDelete(materialId);    
    res.json( result );
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// PUT /api/materials/move
// --------------------------------------------------
router.put("/move", async (req, res) => {
  const { info, data } = req.body;
  console.log( "UPD", data.src_id, data.dst_id );

  try {
    // move all materials
    const result = await Material.updateMany(
      { owner: data.src_id },
      { $set: { "owner": data.dst_id } }
    );    
    res.json( result );
  } catch (err) {
    console.log( "ERR-T", err );
    res.status(500).json(err);
  }

});


// --------------------------------------------------
// PUT /api/materials/:id
// --------------------------------------------------
router.put("/:id", async (req, res) => {
  const { info, data } = req.body;
  try {
    // create one project
    const result = await Material.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );    
    res.json( result );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

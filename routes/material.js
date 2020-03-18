const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Project = require("../models/Project");
const Material = require("../models/Material");
const Template = require("../models/Template");
const Element = require("../models/Element");

const { cloudinary } = require('../configs/cloudinary');

let objectID = require('mongoose').Types.ObjectId();

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

  //console.log( "MBUSR", `'${userId}'` );

  try {
    // return all materials
    let allMaterials;
    let allUser;
    let userList;

    if( req.user.role === 'admin') {
      if( userId === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        allMaterials = await Material.find( { owner: { $nin: userList } } ).populate('owner');
      } else {
        allMaterials = await Material.find( { owner: userId } ).populate('owner');
      }
      //console.log( "ALLM", allMaterials );
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
// DELETE /api/materials/owner/:id
// --------------------------------------------------
router.delete("/owner/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // delete material
    let result;
    let allUser;
    let userList;

    if( req.user.role === 'admin') {
      if( userId === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        result = await Material.deleteMany( { owner: { $nin: userList } } );
      } else {
        result = await Material.deleteMany( { owner: userId } );
      }
      res.json( result );
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (err) {
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
    allMaterials = await Material.find( { owner: { $nin: userList } } ).populate('owner');

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

  try {
    // move all materials
    let allUser;
    let userList;
    let result;

    if( req.user.role === 'admin') {
      if( data.src_id === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        result = await Material.updateMany(
          { owner: { $nin: userList } },
          { $set: { "owner": data.dst_id } }
        );    
      } else {
        if( data.dst_id === "0" ) {
          data.dst_id = objectID;
          //console.log( "MOWID", data.dst_id );
        }
        result = await Material.updateMany(
          { owner: data.src_id },
          { $set: { "owner": data.dst_id } }
        );    
      }
      //console.log( "RESM", result );
      res.json( result );
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log( err );
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// POST api/materials/copy
// --------------------------------------------------
router.post("/copy", async (req, res) => {
  let { info, data, dst_id } = req.body;

  try {
    if( req.user.role === 'admin') {
      if( dst_id === "0" ) {
        dst_id = objectID;
        //console.log( "MOWID-CPY", dst_id );
      }

      // create materials
      data = data.map( (material) => { material.owner = dst_id; material._id = undefined; return material; });
      const result = await Material.create(data);    
      res.json( result );
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    //console.log( err );
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

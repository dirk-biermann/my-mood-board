const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Material = require("../models/Material");
const Template = require("../models/Template");
const Element = require("../models/Element");

const { cloudinary } = require('../configs/cloudinary');

var objectID = require('mongoose').Types.ObjectId();

// --------------------------------------------------
// GET /api/templates
// --------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    // return all templates
    const allTemplates = await Template.find({owner: req.user._id});
    res.json( allTemplates );
  } catch (err) {
    res.status(500).json(err);
  }
});


// --------------------------------------------------
// GET /api/templates/usr/:id
// --------------------------------------------------
router.get("/usr/:id", async (req, res) => {
  // return 1 project with a given id
  const userId = req.params.id;

  //console.log( "TBUSR", `'${userId}'` );

  try {
    // return all templates
    let allTemplates;
    let allUser;
    let userList;

    if( req.user.role === 'admin') {
      if( userId === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        allTemplates = await Template.find( { owner: { $nin: userList } } ).populate('owner');
      } else {
        allTemplates = await Template.find( {owner: userId } ).populate('owner');
      }
      //console.log( "ALLT", allTemplates );
      res.json( allTemplates );
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log( err );
    res.status(500).json(err);
  }
});


// --------------------------------------------------
// GET /api/templates/:id
// --------------------------------------------------
router.get("/:id", async (req, res) => {
  // return 1 template with a given id
  const templateId = req.params.id;
  try {
    // create one template
    const template = await Template.findById(templateId);    
    if (!template) {
      res.status(404).json({ message: "template not found" });
    } else res.json(template);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// POST api/templates
// --------------------------------------------------
router.post("/create", async (req, res) => {
  const { info, data } = req.body;
  try {
    // create one template
    const result = await Template.create(data);    
    res.json( result );
  } catch (err) {
    console.log( "CRT-ERR:", err );
    res.status(500).json(err);
  }
});


// --------------------------------------------------
// DELETE /api/templates/owner/:id
// --------------------------------------------------
router.delete("/owner/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // delete templates
    let result;
    let allUser;
    let userList;

    if( req.user.role === 'admin') {
      if( userId === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        result = await Template.deleteMany( { owner: { $nin: userList } } );
      } else {
        result = await Template.deleteMany( { owner: userId } );
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
// DELETE /api/templates/:id
// --------------------------------------------------
router.delete("/:id", async (req, res) => {
  const templateId = req.params.id;
  try {
    // create one template
    const result = await Template.findByIdAndDelete(templateId);    
    res.json( result );
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// PUT /api/templates/move
// --------------------------------------------------
router.put("/move", async (req, res) => {
  const { info, data } = req.body;

  try {
    // move all templates
    let allUser;
    let userList;
    let result;

    if( req.user.role === 'admin') {
      if( data.src_id === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        result = await Template.updateMany(
          { owner: { $nin: userList } },
          { $set: { "owner": data.dst_id } }
        );    
      } else {
        if( data.dst_id === "0" ) {
          data.dst_id = objectID;
          7/console.log( "TOWID", data.dst_id );
        }
        result = await Template.updateMany(
          { owner: data.src_id },
          { $set: { "owner": data.dst_id } }
        );    
      }
      //console.log( "REST", result );
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
// POST api/templates/copy
// --------------------------------------------------
router.post("/copy", async (req, res) => {
  let { info, data, dst_id } = req.body;

  try {
    if( req.user.role === 'admin') {
      if( dst_id === "0" ) {
        dst_id = objectID;
        //console.log( "TOWID-CPY", dst_id );
      }

      // create one templates
      data = data.map( (template) => { template.owner = dst_id; template._id = undefined; return template; });
      const result = await Template.create(data);    
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
// PUT /api/templates/:id
// --------------------------------------------------
router.put("/:id", async (req, res) => {
  const { info, data } = req.body;
  try {
    // create one template
    const result = await Template.findByIdAndUpdate(
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

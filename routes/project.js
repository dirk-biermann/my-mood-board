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
// GET /api/projects
// --------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    // return all projects
    let allProjects;
    allProjects = await Project.find({owner: req.user._id}).populate('materials');
    res.json( allProjects );
  } catch (err) {
    console.log( err );
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// GET /api/projects/usr/:id
// --------------------------------------------------
router.get("/usr/:id", async (req, res) => {
  // return 1 project with a given id
  const userId = req.params.id;

  //console.log( "PBUSR", `'${userId}'` );

  try {
    // return all projects
    let allProjects;
    let allUser;
    let userList;

    if( req.user.role === 'admin') {
      if( userId === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        allProjects = await Project.find( { owner: { $nin: userList } } ).populate('materials').populate('owner');
      } else {
        allProjects = await Project.find( { owner: userId } ).populate('materials').populate('owner');
      }
      //console.log( "ALLP", allProjects );
      res.json( allProjects );
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log( err );
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// GET /api/projects/pop/:id
// --------------------------------------------------
router.get("/pop/:id", async (req, res) => {
  // return 1 project with a given id
  const projectId = req.params.id;
  try {
    // create one project
    let project;

    if( req.user.role === 'admin') {
      project = await Project.findById(projectId).populate( "materials" ).populate("owner");    
    } else {
      project = await Project.findById(projectId).populate( "materials" );    
    }
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// GET /api/projects/:id
// --------------------------------------------------
router.get("/:id", async (req, res) => {
  // return 1 project with a given id
  const projectId = req.params.id;

  try {
    // create one project
    let project;
    project = await Project.findById(projectId);    
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// POST api/projects
// --------------------------------------------------
router.post("/create", async (req, res) => {
  const { info, data } = req.body;
  try {
    // create one project
    const result = await Project.create(data);    
    res.json( result );
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// DELETE /api/projects/owner/:id
// --------------------------------------------------
router.delete("/owner/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // delete projects
    let result;
    let allUser;
    let userList;

    if( req.user.role === 'admin') {
      if( userId === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        result = await Project.deleteMany( { owner: { $nin: userList } } );
      } else {
        result = await Project.deleteMany( { owner: userId } );
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
// DELETE /api/projects/:id
// --------------------------------------------------
router.delete("/:id", async (req, res) => {
  const projectId = req.params.id;
  try {
    // create one project
    const result = await Project.findByIdAndDelete(projectId);    
    res.json( result );
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// PUT /api/projects/move
// --------------------------------------------------
router.put("/move", async (req, res) => {
  const { info, data } = req.body;
 
  try {
    // move all projects
    let allUser;
    let userList;
    let result;

    if( req.user.role === 'admin') {
      if( data.src_id === "0" ) {
        allUser = await User.find();
        userList = allUser.map( (user) => { return user._id; });
        result = await Project.updateMany(
          { owner: { $nin: userList } },
          { $set: { "owner": data.dst_id } }
        );    
      } else {
        if( data.dst_id === "0" ) {
          data.dst_id = objectID;
          //console.log( "POWID", data.dst_id );
        }
        result = await Project.updateMany(
          { owner: data.src_id },
          { $set: { "owner": data.dst_id } }
        );    
      }
      //console.log( "RESP", result );
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
// POST api/projects/copy
// --------------------------------------------------
router.post("/copy", async (req, res) => {
  let { info, data, dst_id } = req.body;

  try {
    if( req.user.role === 'admin') {
      if( dst_id === "0" ) {
        dst_id = objectID;
        //console.log( "POWID-CPY", dst_id );
      }

      // create one project
      data = data.map( (project) => { project.owner = dst_id; project._id = undefined; return project; });
      const result = await Project.create(data);    
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
// PUT /api/projects/:id
// --------------------------------------------------
router.put("/:id", async (req, res) => {
  const { info, data } = req.body;
  try {
    // create one project
    const result = await Project.findByIdAndUpdate(
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

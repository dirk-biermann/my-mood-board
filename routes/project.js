const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Material = require("../models/Material");

const { cloudinary } = require('../configs/cloudinary');

// --------------------------------------------------
// GET /api/projects
// --------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    // return all projects
    let allProjects;
    allProjects = await Project.find({owner: req.user._id});
    res.json( allProjects );
  } catch (err) {
    console.log( err );
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
// GET /api/projects/usr/:id
// --------------------------------------------------
router.get("/usr/:id", async (req, res) => {
  // return 1 project with a given id
  const userId = req.params.id;

  try {
    // return all projects
    let allProjects;
    if( req.user.role === 'admin') {
      allProjects = await Project.find({owner: userId}).populate('owner');
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

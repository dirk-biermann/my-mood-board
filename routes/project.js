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
    const allProjects = await Project.find({owner: req.user._id});
    res.json( allProjects );
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
    const project = await Project.findById(projectId);    
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
router.put("/:id", (req, res) => {
  const { info, data } = req.body;
  Project.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    )
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


/*
  	  {
        name: data.name,
        description: data.description,
        notes: data.notes,
        status: data.status,
        imageUrl: data.imageUrl,
        imagePublicID: data.imagePublicID,
        owner: data.owner,
        materials: data.materials
      },

// --------------------------------------------------
// PUT /api/projects/:id
// --------------------------------------------------
router.put("/:id", (req, res) => {
  Project.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      imageURL: req.body.imageURL,
      publicID: req.body.publicID
    },
    { new: true }
  )
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

*/

module.exports = router;

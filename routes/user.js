const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Material = require("../models/Material");

// --------------------------------------------------
// GET /api/users
// --------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    // return all user
    let allUser;
    let allProjects;
    let allMaterials;
    let objCount = [];

    if( req.user.role === 'admin') {
      allUser = await User.find();
      allProjects = await Project.find();
      allMaterials = await Material.find();

      allUser.forEach( (user) => {
          let pCnt = 0;
          let mCnt = 0;

          pCnt = allProjects.reduce( (total, project) => {
              return total + ( project.owner.toString() === user._id.toString() ? 1 : 0);
            }, 0);
          mCnt = allMaterials.reduce( (total, material) => {
              return total + ( material.owner.toString() === user._id.toString() ? 1 : 0);
            }, 0);
          objCount.push( { id: user._id, mCnt: mCnt, pCnt: pCnt });
        });
      res.json( { allUser, objCount } );
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log( err );
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// DELETE /api/users/:id
// --------------------------------------------------
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // create one project
    let result;
    if( req.user.role === 'admin') {
      result = await User.findByIdAndDelete(userId);    
      res.json( result );
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log( "user.", err );
    res.status(500).json(err);
  }
});

module.exports = router;

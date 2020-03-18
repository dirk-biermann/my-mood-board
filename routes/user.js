const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Material = require("../models/Material");
const Template = require("../models/Template");

// --------------------------------------------------
// GET /api/users
// --------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    // return all user
    let allUser;
    let allProjects;
    let allMaterials;
    let allTemplates;
    let objCount;
    let fid;

    if( req.user.role === 'admin') {
      allUser = await User.find();
      allProjects = await Project.find();
      allMaterials = await Material.find();
      allTemplates = await Template.find();

      objCount = Array.from({length: allUser.length}, (v, i) => { return {id: allUser[i]._id, pCnt:0, mCnt:0, tCnt: 0} }) ;
      objCountNone = { id: "", pCnt:0, mCnt:0, tCnt: 0 };

      allProjects.forEach( (project) => {
          fid = allUser.findIndex( (user) => {
              return project.owner.toString() === user._id.toString();
            })
          if( fid > -1 ) { objCount[fid].pCnt++; } else { objCountNone.pCnt++; }
        });
      allMaterials.forEach( (material) => {
          fid = allUser.findIndex( (user) => {
              return material.owner.toString() === user._id.toString();
            })
          if( fid > -1 ) { objCount[fid].mCnt++; } else { objCountNone.mCnt++; }
        });
      allTemplates.forEach( (template) => {
          fid = allUser.findIndex( (user) => {
              return template.owner.toString() === user._id.toString();
            })
          if( fid > -1 ) { objCount[fid].tCnt++; } else { objCountNone.tCnt++; }
        });
      objCount.push( objCountNone );
      //console.log( "OBJCNTNEW", objCount );

/*
      allUser.forEach( (user) => {
          let pCnt = 0;
          let mCnt = 0;
          let tCnt = 0;

          pCnt = allProjects.reduce( (total, project) => {
              return total + ( project.owner.toString() === user._id.toString() ? 1 : 0);
            }, 0);
          mCnt = allMaterials.reduce( (total, material) => {
              return total + ( material.owner.toString() === user._id.toString() ? 1 : 0);
            }, 0);
          tCnt = allTemplates.reduce( (total, template) => {
              return total + ( template.owner.toString() === user._id.toString() ? 1 : 0);
            }, 0);
          objCount.push( { id: user._id, mCnt: mCnt, pCnt: pCnt, tCnt: tCnt});
        });
*/
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
    // delete one user
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

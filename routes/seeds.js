const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Component = require("../models/Material");
const Template = require("../models/Template");
const Element = require("../models/Element");
const mongoose = require("mongoose");

const initSeeds =
[
	{
		"element":     "InputText",
		"description": "FORM-INPUT of type text",
		"eltype":      "text",

		"fixedProps":    [
		  { "prop": "name"        , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "label"       , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "placeholder" , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "readonly"    , "typ": "checkbox", "disp": "Boolean", "def": false },
		  { "prop": "required"    , "typ": "checkbox", "disp": "Boolean", "def": false }
		],

		"variableProps": [
		  { "prop": "maxlength"   , "typ": "number", "disp": "Number", "def": 100 }
		],
		"status": false 
	  
	},
	{
		"element":     "InputNumber",
		"description": "FORM-INPUT of type number",
		"eltype":      "number",

		"fixedProps":    [
		  { "prop": "name"        , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "label"       , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "placeholder" , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "readonly"    , "typ": "checkbox", "disp": "Boolean", "def": false },
		  { "prop": "required"    , "typ": "checkbox", "disp": "Boolean", "def": false }
		],

		"variableProps": [
		  { "prop": "min"         , "typ": "number", "disp": "Number", "def": 0 },
		  { "prop": "max"         , "typ": "number", "disp": "Number", "def": 100 },
		  { "prop": "step"        , "typ": "number", "disp": "Number", "def": 1 }
		],
		"status": false 
	},
	{
		"element":     "InputColor",
		"description": "FORM-INPUT of type color",
		"eltype":      "color",

		"fixedProps":    [
		  { "prop": "name"        , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "label"       , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "placeholder" , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "readonly"    , "typ": "checkbox", "disp": "Boolean", "def": false },
		  { "prop": "required"    , "typ": "checkbox", "disp": "Boolean", "def": false }
		],

		"variableProps": [
		  { "prop": "defaultcolor" , "typ": "text", "disp": "Color", "def": "#0000000", "ext": "InputColor" }
		],
		"status": false 
	},
	{  
		"element":     "InputCheckBox",
		"description": "FORM-INPUT of type checkbox",
		"eltype":      "checkbox",

		"fixedProps":    [
		  { "prop": "name"        , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "label"       , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "placeholder" , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "readonly"    , "typ": "checkbox", "disp": "Boolean", "def": false },
		  { "prop": "required"    , "typ": "checkbox", "disp": "Boolean", "def": false }
		],

		"variableProps": [
		  { "prop": "checked"     , "typ": "checkbox", "def": false }
		],
		"status": false 
	},
	{
		"element":     "InputTextArea",
		"description": "FORM-INPUT of type textarea",
		"eltype":      "textarea",

		"fixedProps":    [
		  { "prop": "name"        , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "label"       , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "placeholder" , "typ": "text",     "disp": "String",  "def": "" },
		  { "prop": "readonly"    , "typ": "checkbox", "disp": "Boolean", "def": false },
		  { "prop": "required"    , "typ": "checkbox", "disp": "Boolean", "def": false }
		],

		"variableProps": [
		  { "prop": "maxlength"   , "typ": "number", "disp": "Number", "def": 100 },
		  { "prop": "wrap"        , "typ": "text",   "disp": "String", "def": "soft" }
		],
		"status": false
	}
];

/*
let readItems = new Promise((resolve, reject) => {
  var getElementsFromFile = function(cb) { 
    console.log("called getElementsFromFile");
    fs.readFile('./models/element-seed.json', 'utf8', (err, data) => {
      if (err) cb({error: err});
      cb({items: JSON.parse(data)});
    });
  };

  getElementsFromFile(function (cb) {
    console.log("called getElementsFromFile callback");
    if (cb.error) {
      resolve( { error: "Elements file not imported" } );
    } else {
      console.log("I:",cb.items);
      resolve( { items: cb.items.slice() } );
    }
  });
});
*/

// GET /api/init/:collection/:password
router.get("/:collection/:password", async (req, res, next) => {
  let readItems = [];
	const username = req.params.username;
	const pwd = req.params.password;
	const collection = req.params.collection;
  const authorized = ( (username === "admin") && (pwd === 'TraVogZahBie') );

	if( authorized ) {
		switch(collection) {
			case "elements":
				try {
					await Element.deleteMany();
					await Element.create( initSeeds );
					res.json({message: "Elements file were imported"});
				} catch (err) {
					res.status(500).json(err);
				}
				break;

			case "projects":
				try {
					await Project.deleteMany();
					res.json({message: "Projects were removed"});
				} catch (err) {
					res.status(500).json(err);
				}
				break;

			case "materials":
				try {
					await Component.deleteMany();
					res.json({message: "Components were removed"});
				} catch (err) {
					res.status(500).json(err);
				}
				break;

			case "templates":
				try {
					await Template.deleteMany();
					res.json({message: "Templates were removed"});
				} catch (err) {
					res.status(500).json(err);
				}
				break;

			default:
      	res.json("failure");
		} 
	} else {
		res.json("failure");
	}
});

module.exports = router;

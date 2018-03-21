const express = require('express');
const router = express.Router();

// Project Model
let Project = require('../models/project');
// User Model
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_project', {
    title:'Add Project'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('name','name is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
  req.checkBody('type','type is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_project', {
      title:'Add Project',
      errors:errors
    });
  } else {
    let project = new Project();
    project.name = req.body.name;
    console.log(req.user);
    project.type = req.body.type;
    project.author=req.user._id;
    project.id=Date.now();
    console.log(project.name);
    project.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Project Added');
        res.redirect('/projects');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Project.findById(req.params.id, function(err, article){
    if(Project.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_project', {
      title:'Edit Project',
      project:project
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let article = {};
  project.name = req.body.name;
    project.type = req.body.type;
    project.author=req.body._id;

  let query = {_id:req.params.id}

  Project.update(query, project, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Project Updated');
      res.redirect('/');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Project.findById(req.params.id, function(err, project){
    if(project.author != req.user._id){
      res.status(500).send();
    } else {
        Project.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Project
router.get('/:id', function(req, res){
    Project.findById(req.params.id, function(err, project){
    User.findById(project.author, function(err, user){
      res.render('project', {
        project:project,
        author: user.name
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;

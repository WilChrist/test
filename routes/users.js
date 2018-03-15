const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

// Bring in Citizen Model
let Citizen = require('../models/citizen');

// Bring in ServiceProvider Model
let ServiceProvider = require('../models/serviceProvider');

// Bring in Administrator Model
//let Administrator = require('../models/administrator');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Proccess
router.post('/register', function(req, res){
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const usertype = req.body.usertype;
  const birth_date= req.body.birth_date;
  const gender = req.body.gender;
  const location = req.body.location;
  //const registering_date = Date.now();
let newUser;

  req.checkBody('first_name', 'First Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    if(usertype == 'ADMINISTRATOR'){

    }else if(usertype == 'SERVICEPROVIDER'){
      newUser = new ServiceProvider({
        first_name:first_name,
        last_name:last_name,
        gender:gender,
        birth_date:birth_date,
        location:location,
        email:email,
        username:username,
        password:password,
        company:"ensa"
      });
      console.log(newUser.password);
    }else{
        newUser = new Citizen({
        first_name:first_name,
        last_name:last_name,
        gender:gender,
        birth_date:birth_date,
        location:location,
        email:email,
        username:username,
        password:password
      });
    }
    

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

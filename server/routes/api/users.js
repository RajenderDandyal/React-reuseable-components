const express = require("express");
const router = express.Router();
const Users = require("../../models/User");
const bcrypt = require('bcryptjs');
const secretOrKey = require("../../config/keys").secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const multer = require('multer')
// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "user works"}));

// @route  GET api/users/register
// @desc   adding new user
// @access Public

router.post('/register', (req, res) => {
  //server side validation of incoming data
  const {errors, isValid} = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //checking if email already exists on db
  Users.findOne({email: req.body.email})
      .then(user => {
        if (user) {
          // if user email already exists
          // then setting response status to 400(bad request) with json msg
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
          // creating newUser object from req body to save on database
          const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          // hashing password using bcrypt
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;

              //saving newUser to database
              newUser.save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err))
            });
          });
        }
      })
});

// @route  GET api/users/login
// @desc   loging in user / receiving token from server
// @access Public

router.post('/login', (req, res) => {
  //server side validation of incoming data
  const {errors, isValid} = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({email: email}).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors)
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //payload for token
        const payload = {
          name: user.name,
          avatar: user.avatar,
          id: user.id
        };

        //creating token and sending it to user
        jwt.sign(
            payload,
            secretOrKey,
            {expiresIn: 60 * 60},
            (err, token) => res.json({
              success: true,
              token: 'Bearer ' + token
            }))
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }

    })
  })
});

// @route  GET api/users/current
// @desc   current user profile
// @access protected

router.get('/current', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,

      })
    });

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

let upload = multer({storage: storage}).single('file');

router.post("/image-upload", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)

  })
});

let uploadImgArray = multer({ storage: storage }).array('file')
router.post("/images-upload", (req, res) => {
  uploadImgArray(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send({success:true})

  })
});

module.exports = router;
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// IMPORT VALIDATION
const { registerValidation, loginValidation } = require('../validation');

// REGISTRATION ROUTE
router.post('/register', async (req, res) => {

  // validate user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check to see if email is already registered
  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck) {
    return res.status(400).send('Email already registered.');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try{
    const savedUser = await user.save();
    res.send({ user: user._id });
  }catch(err){
    res.status(400).send(err);
  }
});

// LOGIN ROUTE
router.post('/login', async (req,res) => {

  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Username or password is wrong');
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) {
    return res.status(400).send('Username or password is wrong');
  }

  res.send('Success');
})

module.exports = router;
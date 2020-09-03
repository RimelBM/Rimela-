const router = require("express").Router() ;

// User Model

const User = require('../models/user') ;


router.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router ;
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.render("users/index.ejs", {
    users: allUsers    
    });
});

  // GET /:userid
  router.get("/:userId", async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render("users/show.ejs", { selectedUser: user });
  });


module.exports = router;

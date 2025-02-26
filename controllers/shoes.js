const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
    try {
        res.render('shoes/index.ejs');
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
  });

//GET /users/:userId/shoes/new
router.get('/new', async (req, res) => {
    res.render('shoes/new.ejs');
});

// POST /users/:userId/shoes
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session._id);
        currentUser.shoes.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/shoes`);
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
});



module.exports = router;

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users/:userId/shoes
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('shoes/index.ejs', {
            shoes: currentUser.shoes,
        });
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
        const currentUser = await User.findById(req.session.user._id);
        currentUser.shoes.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/shoes`);
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
});

// GET /users/:userId/shoes/:shoeId
router.get('/:shoeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const shoe = currentUser.shoes.id(req.params.shoeId);
        res.render('shoes/show.ejs', {
            shoe: shoe,
        });
    } catch (error) {
      console.log(error)
      res.redirect('/');
    }
});

// DELETE /users/:userId/shoes/:shoesId
router.delete('/:shoeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.shoes.id(req.params.shoeId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/shoes`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//GET /users/:userId/shoes/edit
router.get('/:shoeId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const shoe = currentUser.shoes.id(req.params.shoeId);
        res.render('shoes/edit.ejs', {
            shoe: shoe,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// PUT /users/:userId/shoes/:shoeId
router.put('/:shoeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const shoe = currentUser.shoes.id(req.params.shoeId);
        shoe.set(req.body);
        await currentUser.save();
        res.redirect(
            `/users/${currentUser._id}/shoes/${req.params.shoeId}`
        );
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
});







module.exports = router;

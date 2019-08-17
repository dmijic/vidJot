const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Idea Model
require('../models/idea');
const Idea = mongoose.model('ideas');

// Idea index page
router.get('/', (req, res) => {
    Idea.find({})
    .sort({date: 'desc'})
    .then(ideas =>{
    res.render('ideas/index', {
        ideas: ideas
        });
    });
});

// Add Idea route
router.get('/add', (req,res) => {
    res.render('ideas/add')
});

// Edit Idea route
router.get('/edit/:id', (req,res) => {
    Idea.findOne({
        _id:req.params.id
    })
    .then(idea => {
        req.flash('success_msg', 'Video idea updated');
        res.render('ideas/edit', {
            idea:idea
        });
    });
});

// Process form
router.post('/', (req, res) => {
    let errors = [];
    if(!req.body.title){
        errors.push({text:'Please add a title'});
    }
    if(!req.body.details){
        errors.push({text: 'Please add some details'})
    }

    if(errors.length > 0){
        res.render('/add', {
        errors: errors,
        title: req.body.title,
        details: req.body.details
    });
} else {
    const newUser = {
        title: req.body.title,
        details: req.body.details
    }
    new Idea(newUser)
    .save()
    .then(idea => {
        req.flash('success_msg', 'Video idea added');
        res.redirect('/ideas');
    })
}
});

// Edit form process
router.put('/:id', (req, res) =>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        // new values
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save()
        .then( idea =>{
            res.redirect('/ideas')
        })
    })
});

//Delete Idea
router.delete('/:id', (req, res) =>{
    Idea.remove({_id: req.params.id})
    .then(() => {
        req.flash('success_msg', 'Video idea removed');
        res.redirect('/ideas');
    })
});


module.exports = router;
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { UserModel } = require('../models/user');
const { AdminModel } = require('../models/admin');
const {NotesModel } = require("../models/notes");
const notesController = require('../controllers/notes')
const sampleAdmin = [
   { email: 'minoh45@example.com',
    password: 'ghhbb.$Ehnj7123'},
];

router.get('/signin', (req, res) => {
    res.render('login');
});

router.get('/dashboard', async (req, res) => {
    const notes = await NotesModel.find({}).lean().sort({dateCreated: -1});
    res.render('dash', {notes});
});

router.post('/makenote', (req, res) => {
    res.render('dash');
});

router.get('/signup', (req, res) => {
    res.render('signing');
});

router.post('/signing', async (req, res) => {
    let user = await UserModel.findOne({email: req.body.email});
    if (user) {
        res.send("User already exists");
    }
    
    else {
        let user = await UserModel.create(req.body);
        user = await UserModel.findOne({_id: user._id}).lean();
        
        let notes = await NotesModel.find({}).lean();
        res.render('dash', { user, notes })
    }
})

router.get('/cancel', (req, res) => { 
    res.render('login');
});

router.get('/submit', (req, res) => {
    res.render('dash');
});

router.get('/register', (req, res) => {
    res.render('signing');
});

router.get('/', (req, res) => {
  res.render('signing');
});

router.post('/dash', (req, res) => {
    const username = req.body.username;
    if (username) {
      users.push(username);
      res.render('dash', { username });
    } else {
      res.redirect('/');
    }
});

const notes = [];
  
router.get('/', (req, res) => {
    res.render('dash', { notes });
});

router.post('/create', async (req, res) => {
    if (req.body.title.length < 1) {
        res.send("title cannot be empty")
    } else{
        await NotesModel.create(req.body)
    
        const notes = await NotesModel.find({}).lean().sort({dateCreated: -1});
        res.render('dash', { notes });

    }
});

router.post('/update', async (req, res) => {
    const data = await NotesModel.findById(req.body.id)
    if (!data) {
        res.render('note does not exist');
    }
    else {
        console.log("data = ", req.body)
        await NotesModel.findByIdAndUpdate(req.body.id, req.body, {});
        const notes = await NotesModel.find({}).lean().sort({dateCreated: -1});
        console.log("notes = ", notes)

        res.render("dash", { notes })
    }
});

router.post('/delete', notesController.delete)


module.exports = router;



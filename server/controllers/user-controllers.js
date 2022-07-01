const router = require('express').Router();
const { User } = require('../models');

// GET all users /api/users
router.get('/', (req, res) => {
    User.find({}).select('-__v -password')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST add user /api/users
router.post('/', async ({ body }, res) => {
    // expects { email: example@gmail.com, password: somepassword }
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
const router = require('express').Router();
const { User } = require('../models');
const { signToken } = require('../utils/auth');

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
    const user = await User.create(body).select('-__v -password');
    const token = signToken(user);

    res.json({ token, user });
});

// POST login user /api/users/login
router.post('/login', async ({ body }, res) => {
    const user = await User.findOne({ email: body.email }).select('-__v');

    if (!user) {
        return res.status(500).json({ message: 'Invalid email.' });
    }

    const correctPassword = await user.isCorrectPassword(body.password);

    if (!correctPassword) {
        return res.status(500).json({ message: 'Invalid password.' });
    }

    const token = signToken(user);
    res.json({ token, user });
});

module.exports = router;
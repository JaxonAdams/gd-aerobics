const router = require('express').Router();
const { PunchPass } = require('../models');

// GET all passes /api/passes
router.get('/', (req, res) => {
    PunchPass.find({})
    .select('-__v')
    .then(dbPassData => res.json(dbPassData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST add a new pass /api/passes
router.post('/', ({ body }, res) => {
    // Body expects { name: passHoldersName, passType: regular }
    PunchPass.create(body)
    .then(dbPassData => res.json(dbPassData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST 'punch' the pass /api/passes/:id/punch
router.post('/:id/punch', (req, res) => {
    PunchPass.findOne({ _id: req.params.id })
    .then(dbPassData => {
        if (!dbPassData) {
            return res.status(404).json({ message: 'Pass not found' });
        }
        PunchPass.findOneAndUpdate(
            { _id: req.params.id },
            { punches: dbPassData.punches + 1 },
            { new: true, useValidators: true }
        )
        .select('-__v')
        .then(dbNewPassData => res.json(dbNewPassData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST renew the pass /api/passes/:id/renew
router.post('/:id/renew', (req, res) => {
    PunchPass.findOne({ _id: req.params.id })
    .then(dbPassData => {
        if (!dbPassData) {
            return res.status(404).json({ message: 'Pass not found' });
        }
        PunchPass.findOneAndUpdate(
            { _id: req.params.id },
            { punches: dbPassData.overduePunches ? dbPassData.overduePunches : 0 },
            { new: true, runValidators: true }
        )
        .select('-__v')
        .then(dbNewPassData => res.json(dbNewPassData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
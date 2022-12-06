const router = require('express').Router();
const { PunchPass } = require('../models');

// GET all passes /api/passes
router.get('/', (req, res) => {
    PunchPass.find({})
    .select('-__v')
    .sort('name')
    .then(dbPassData => res.json(dbPassData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET pass by id /api/passes/:id
router.get('/:id', ({ params }, res) => {
    PunchPass.findOne({ _id: params.id })
    .then(dbPassData => {
        if (!dbPassData) {
            return res.status(404).json({ message: 'Pass not found' });
        }
        res.json(dbPassData);
    })
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

// DELETE remove pass /api/passes/:id
router.delete('/:id', ({ params }, res) => {
    PunchPass.findOneAndDelete({ _id: params.id })
    .then(dbPassData => {
        if (!dbPassData) {
            return res.status(404).json({ message: 'Pass not found' });
        }
        res.json(dbPassData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT update note on pass /api/passes/note
router.put('/note', ({ body }, res) => {
    PunchPass.findOneAndUpdate(
        { name: body.name, passType: body.passType },
        { note: body.note },
        { new: true, runValidators: true }
    )
    .then(dbPassData => {
        if (!dbPassData) {
            return res.status(404).json({ message: 'Pass not found' });
        };
        res.json(dbPassData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// PUT update waiver checkbox /api/passes/:id/waiver
router.put('/:id/waiver', ({ params, body }, res) => {
    PunchPass.findOneAndUpdate(
        { _id: params.id },
        { waiverReceived: body.waiverReceived },
        { new: true, runValidators: true }
    )
    .then(dbPassData => {
        if (!dbPassData) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(dbPassData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT general update to pass /api/passes/:id
router.put('/:id', ({ params, body }, res) => {
    PunchPass.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
    )
    .then(dbPassData => {
        if (!dbPassData) {
            return res.status(404).json({ message: 'Pass not found' });
        }
        res.json(dbPassData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET punch pass count /api/passes/count
router.get('/info/count', (req, res) => {
    PunchPass.find({})
    .then(dbPassData => {
        const regCount = dbPassData.filter(pass => {
            return pass.passType == 'Regular'
        }).length;
        const unlimitedCount = dbPassData.filter(pass => {
            return pass.passType == 'Unlimited'
        }).length;
        res.status(200).json({ regular: regCount, unlimited: unlimitedCount });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
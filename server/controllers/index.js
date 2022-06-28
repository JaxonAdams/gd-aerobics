const router = require('express').Router();
const punchPassController = require('./punchpass-controller');

router.use('/api/passes', punchPassController);

module.exports = router;
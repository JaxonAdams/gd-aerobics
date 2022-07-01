const router = require('express').Router();
const punchPassController = require('./punchpass-controller');
const userController = require('./user-controllers');

router.use('/api/passes', punchPassController);
router.use('/api/users', userController);

module.exports = router;
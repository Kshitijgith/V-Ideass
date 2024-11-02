const express = require('express');
const router = express.Router();
const {getProjectGroup} = require('../controllers/studentcontroller');

const { protect, authorize } = require('../middleware/auth');


router.post('/find-group', protect, authorize('student'), getProjectGroup);





module.exports = router;

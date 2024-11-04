const express = require('express');
const multer = require('multer');
const router = express.Router();


const { getProjectGroup, UpdateGroup } = require('../controllers/studentcontroller');
const { protect, authorize } = require('../middleware/auth');

router.post('/find-group', protect, authorize('student'), getProjectGroup);
router.post('/update-group', protect, authorize('student'), UpdateGroup);
//
module.exports = router;

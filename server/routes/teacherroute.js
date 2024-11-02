const express = require('express');
const router = express.Router();
const {createGroup} = require('../controllers/teachercontroller');

const { protect, authorize } = require('../middleware/auth');


router.post('/create-group', protect, authorize('teacher'), createGroup);



module.exports = router;




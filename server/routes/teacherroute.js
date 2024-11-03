const express = require('express');
const router = express.Router();
const {createGroup,Getgroups} = require('../controllers/teachercontroller');

const { protect, authorize } = require('../middleware/auth');


router.post('/create-group', protect, authorize('teacher'), createGroup);
router.post('/find-group', protect, authorize('teacher'), Getgroups);



module.exports = router;




const express = require('express');
const router = express.Router();
const {createGroup,Getgroups,Approve} = require('../controllers/teachercontroller');

const { protect, authorize } = require('../middleware/auth');


router.post('/create-group', protect, authorize('teacher'), createGroup);
router.post('/find-group', protect, authorize('teacher'), Getgroups);
router.post('/Approve-group', protect, authorize('teacher'), Approve);


module.exports = router;




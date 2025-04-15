const express = require('express');
const router = express.Router();
const {createGroup,Getgroups,Approve,UpdateProfile,Teacherinfo} = require('../controllers/teachercontroller');
const {FindTeacher}=require('../controllers/fetchteachers')

const { protect, authorize } = require('../middleware/auth');
const { GroupChat, Insertchat } = require('../controllers/fetchgroupcontroller');
const {createanaulReport}=require('../controllers/GenrateReport');

router.post('/Update-Profile',protect,authorize('teacher'),UpdateProfile)
router.post('/create-group', protect, authorize('teacher'), createGroup);
router.post('/find-group', protect, authorize('teacher'), Getgroups);
router.post('/Approve-group', protect, authorize('teacher'), Approve);
router.post('/GroupChat', protect, authorize('teacher'), GroupChat);
router.post('/Teacherinfo',protect,authorize('teacher'),Teacherinfo);
router.post('/genrate',protect,authorize('teacher'),createanaulReport);
// router.post('/Run',protect,authorize('teacher'),initializeSocketServer);
module.exports = router;




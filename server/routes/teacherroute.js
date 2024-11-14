const express = require('express');
const router = express.Router();
const {createGroup,Getgroups,Approve} = require('../controllers/teachercontroller');
const {FindTeacher}=require('../controllers/fetchteachers')
const { protect, authorize } = require('../middleware/auth');
const { GroupChat, Insertchat } = require('../controllers/fetchgroupcontroller');
const {initializeSocketServer}=require('../SocketServer/Sserver')
router.post('/create-group', protect, authorize('teacher'), createGroup);
router.post('/find-group', protect, authorize('teacher'), Getgroups);
router.post('/Approve-group', protect, authorize('teacher'), Approve);
router.post('/GroupChat', protect, authorize('teacher'), GroupChat);
// router.post('/Run',protect,authorize('teacher'),initializeSocketServer);
module.exports = router;




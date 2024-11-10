const express = require('express');
const multer = require('multer');
const router = express.Router();
const { GroupChat, Insertchat } = require('../controllers/fetchgroupcontroller');
const { getProjectGroup, UpdateGroup } = require('../controllers/studentcontroller');
const { protect, authorize } = require('../middleware/auth');
const {initializeSocketServer}=require('../SocketServer/Sserver')
router.post('/find-group', protect, authorize('student'), getProjectGroup);
router.post('/update-group', protect, authorize('student'), UpdateGroup);
router.post('/GroupChat', protect, authorize('student'), GroupChat);
router.post('/InsertChat',protect,authorize('student'),Insertchat);
router.post('/Run',protect,authorize('student'),initializeSocketServer);

module.exports = router;

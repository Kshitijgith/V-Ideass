const express = require('express');
const router = express.Router();
const { Showgroups, IDgroups } = require('../controllers/fetchgroupcontroller');
const {FindTeacher,TeacherName}=require('../controllers/fetchteachers')
router.post('/Find-Teacher',FindTeacher);
router.post('/Teacher',TeacherName);
router.post('/all-groups',Showgroups);
router.post('/Id',IDgroups)
module.exports = router;